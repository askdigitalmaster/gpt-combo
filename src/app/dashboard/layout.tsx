import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Zap, History, LayoutDashboard, Settings } from "lucide-react";
import HistorySidebar from "@/components/HistorySidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[#020617] text-white">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/5 bg-[#03081c] flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Combo GPT</span>
                </div>

                <nav className="px-4 space-y-1 mb-6">
                    <SidebarItem icon={<LayoutDashboard className="w-5 h-5" />} label="New Generation" href="/dashboard" active />
                </nav>

                {/* Scrollable History Area */}
                <HistorySidebar />

                <div className="p-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <UserButton />
                        <span className="text-sm font-medium text-white/70">My Account</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}

function SidebarItem({ icon, label, href, active = false }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </Link>
    );
}
