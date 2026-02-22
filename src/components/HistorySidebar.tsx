import Link from "next/link";
import { getHistory } from "@/app/actions";
import { MessageSquare, Clock } from "lucide-react";

export default async function HistorySidebar() {
    const history = await getHistory();

    return (
        <div className="flex-1 overflow-auto py-4 px-4">
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4 px-4 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                History
            </h3>
            <div className="space-y-1">
                {history.length === 0 ? (
                    <p className="px-4 text-sm text-white/20 italic">No generations yet.</p>
                ) : (
                    history.map((item) => (
                        <Link
                            key={item.id}
                            href={`/dashboard/${item.id}`}
                            className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5 group"
                        >
                            <span className="text-sm font-medium text-white/80 line-clamp-1 group-hover:text-white">
                                {item.userInput}
                            </span>
                            <span className="text-[10px] text-white/30">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
