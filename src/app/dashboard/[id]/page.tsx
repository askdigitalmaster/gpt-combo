import { getHistoryItem } from "@/app/actions";
import ReactMarkdown from "react-markdown";
import { Clock, User, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function HistoryItemPage({ params }: { params: { id: string } }) {
    const item = await getHistoryItem(params.id);

    if (!item) {
        notFound();
    }

    return (
        <div className="h-full flex flex-col p-6 space-y-6">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-white">Generation Detail</h1>
                        <p className="text-white/50 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {new Date(item.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                {/* Left: Input Summary */}
                <div className="flex flex-col space-y-6">
                    <div className="glass rounded-3xl border border-white/10 p-6 flex flex-col">
                        <label className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Source Input
                        </label>
                        <div className="text-white/80 whitespace-pre-wrap text-lg leading-relaxed">
                            {item.userInput}
                        </div>
                    </div>
                </div>

                {/* Right: Outputs */}
                <div className="flex flex-col space-y-6">
                    <div className="glass rounded-3xl border border-white/10 p-6 flex flex-col">
                        <label className="text-sm font-bold text-[#10a37f] uppercase tracking-widest mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#10a37f]" />
                            ChatGPT (GPT-5) Result
                        </label>
                        <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white max-w-none">
                            <ReactMarkdown>{item.gptOutput || ""}</ReactMarkdown>
                        </div>
                    </div>

                    <div className="glass rounded-3xl border border-white/10 p-6 flex flex-col">
                        <label className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            xAI (Grok) Result
                        </label>
                        <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white max-w-none">
                            <ReactMarkdown>{item.grokOutput || ""}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
