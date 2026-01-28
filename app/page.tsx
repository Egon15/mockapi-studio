import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* 1. Subtle Background Element - Using theme border/foreground for the dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10 opacity-50" />

      <main className="flex-1 max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 mb-8">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Engineered for Speed
          </span>
        </div>

        {/* Hero Header */}
        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Mock APIs, <br className="hidden md:block" />
          without the friction.
        </h1>

        <p className="mx-auto max-w-xl text-lg text-muted-foreground font-normal leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
          Paste JSON and get a live REST endpoint instantly. Simulate real-world
          conditions without touching a server.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <Link href="/mock">
            <Button
              size="lg"
              className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-xs font-medium uppercase tracking-widest"
            >
              Launch Endpoint <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 gap-12 sm:grid-cols-3 text-left border-t border-border/40 pt-16">
          <Feature
            icon={<Terminal className="size-4" />}
            title="JSON to REST"
            description="Automatic endpoint generation from any valid JSON payload. No schemas required."
          />
          <Feature
            icon={<Zap className="size-4" />}
            title="Latency Control"
            description="Configure artificial delays to test frontend loading states and race conditions."
          />
          <Feature
            icon={<ShieldCheck className="size-4" />}
            title="Edge Ready"
            description="Deployed globally on the edge for zero-latency mock responses across the globe."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/40 flex justify-between items-center max-w-5xl mx-auto w-full">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
          Prototypes faster with MockAPI
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground uppercase tracking-widest font-medium">
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors"
          >
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-4 group">
      <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-foreground border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
