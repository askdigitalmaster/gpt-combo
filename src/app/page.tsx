import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Zap, Sparkles, Layout, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-premium overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Zap className="w-6 h-6 text-white text-bold" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">Combo GPT</span>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium transition-all">
                  Log in
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="text-white/80 hover:text-white transition-colors">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Glows */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/30 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-secondary/30 rounded-full blur-[120px] -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary-foreground/80 mb-4 animate-pulse">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>Next Generation AI Content Platform</span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]">
            Generate <span className="text-gradient">Viral GPT</span> Responses In Seconds
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Stop switching tabs. Compare ChatGPT and Grok side-by-side.
            The only tool designed for power users who demand the best AI outputs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
            <SignInButton mode="modal">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent text-white text-lg font-bold hover:scale-105 transition-all shadow-2xl shadow-primary/40">
                Start Generating For Free
              </button>
            </SignInButton>
            <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-lg font-bold hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            <FeatureCard
              icon={<Layout className="w-6 h-6" />}
              title="Split View"
              description="See GPT-5 and Grok outputs side-by-side for instant comparison."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6" />}
              title="Auto Save"
              description="Never lose a generation. Everything is saved to your private dashboard."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Blazing Fast"
              description="Optimized streaming for real-time response generation."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl glass border border-white/10 text-left hover:border-primary/50 transition-all group">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/60 leading-relaxed">{description}</p>
    </div>
  );
}
