"use client"

import { useState } from "react";
import { generateContent } from "../actions";
import ReactMarkdown from "react-markdown";
import { Send, Loader2, Sparkles, Wand2 } from "lucide-react";

export default function DashboardPage() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{ gptOutput: string; grokOutput: string } | null>(null);

    const handleGenerate = async () => {
        if (!input.trim()) return;
        setLoading(true);
        try {
            const data = await generateContent(input);
            setResults(data);
        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col p-6 space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white">New Generation</h1>
                    <p className="text-white/50">Compare top-tier AI outputs side by side.</p>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
                {/* Left: Input */}
                <div className="flex flex-col space-y-4">
                    <div className="flex-1 glass rounded-3xl border border-white/10 p-6 flex flex-col">
                        <label className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Your Inputs
                        </label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste your resume, job description, or any prompt here..."
                            className="flex-1 bg-transparent text-white text-lg resize-none outline-none placeholder:text-white/20 leading-relaxed"
                        />
                        <div className="pt-4 border-t border-white/5 flex justify-end">
                            <button
                                onClick={handleGenerate}
                                disabled={loading || !input.trim()}
                                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-lg shadow-primary/20"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-5 h-5" />
                                        Generate Viral Response
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Outputs */}
                <div className="flex flex-col space-y-6 min-h-0">
                    {/* ChatGPT Output */}
                    <div className="flex-1 glass rounded-3xl border border-white/10 p-6 overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-bold text-[#10a37f] uppercase tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#10a37f]" />
                                ChatGPT (GPT-5)
                            </label>
                        </div>
                        <div className="flex-1 overflow-auto prose prose-invert prose-p:text-white/70 prose-headings:text-white">
                            {loading && !results ? (
                                <div className="space-y-3">
                                    <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
                                    <div className="h-4 bg-white/5 rounded animate-pulse w-full" />
                                    <div className="h-4 bg-white/5 rounded animate-pulse w-5/6" />
                                </div>
                            ) : results ? (
                                <ReactMarkdown>{results.gptOutput}</ReactMarkdown>
                            ) : (
                                <p className="text-white/20 italic">Generated text will appear here...</p>
                            )}
                        </div>
                    </div>

                    {/* Grok Output */}
                    <div className="flex-1 glass rounded-3xl border border-white/10 p-6 overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-white" />
                                xAI (Grok)
                            </label>
                        </div>
                        <div className="flex-1 overflow-auto prose prose-invert prose-p:text-white/70 prose-headings:text-white">
                            {loading && !results ? (
                                <div className="space-y-3">
                                    <div className="h-4 bg-white/5 rounded animate-pulse w-5/6" />
                                    <div className="h-4 bg-white/5 rounded animate-pulse w-full" />
                                    <div className="h-4 bg-white/5 rounded animate-pulse w-2/3" />
                                </div>
                            ) : results ? (
                                <ReactMarkdown>{results.grokOutput}</ReactMarkdown>
                            ) : (
                                <p className="text-white/20 italic">Generated text will appear here...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
