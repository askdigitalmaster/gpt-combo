"use server"

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { contentOutputs } from "@/db/schema";
import OpenAI from "openai";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.inference.ai.azure.com";

export async function generateContent(userInput: string) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    try {
        // Generate from GPT-5 (assuming gpt-5 or gpt-4o as fallback if not avail)
        // Note: GitHub Models often uses specific names like "gpt-4o" but GPT-5 was mentioned as available in 2026 search.
        const gptPromise = client.chat.completions.create({
            messages: [
                { role: "system", content: "You are an expert content creator. Generate a viral, high-converting response based on the input." },
                { role: "user", content: userInput },
            ],
            model: "gpt-5", // Use GPT-5 as requested
            temperature: 1.0,
            max_tokens: 1000,
        });

        // Generate from Grok
        const grokPromise = client.chat.completions.create({
            messages: [
                { role: "system", content: "You are an expert content creator. Generate a viral, high-converting response based on the input." },
                { role: "user", content: userInput },
            ],
            model: "grok-beta", // Standard Grok identifier on GitHub Models or similar
            temperature: 1.0,
            max_tokens: 1000,
        });

        const [gptResponse, grokResponse] = await Promise.all([gptPromise, grokPromise]);

        const gptOutput = gptResponse.choices[0].message.content || "";
        const grokOutput = grokResponse.choices[0].message.content || "";

        // Save to database
        await db.insert(contentOutputs).values({
            userId,
            userInput,
            gptOutput,
            grokOutput,
        });

        return { gptOutput, grokOutput };
    } catch (error) {
        console.error("AI Generation failed:", error);
        throw new Error("Failed to generate content");
    }
}

export async function getHistory() {
    const { userId } = await auth();
    if (!userId) return [];

    return await db.query.contentOutputs.findMany({
        where: (outputs, { eq }) => eq(outputs.userId, userId),
        orderBy: (outputs, { desc }) => [desc(outputs.createdAt)],
    });
}

export async function getHistoryItem(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    return await db.query.contentOutputs.findFirst({
        where: (outputs, { eq, and }) => and(eq(outputs.id, id), eq(outputs.userId, userId)),
    });
}
