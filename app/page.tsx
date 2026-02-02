import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Zap, ShieldCheck, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size:32px_32px mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10 opacity-50" />

      <main className="flex-1 max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Mock APIs, <br className="hidden md:block" />
          without the friction.
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-normal leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
          Instantly transform JSON, XML, or Plain Text into live REST endpoints.
          Simulate latency, status codes, and headers to build resilient
          frontends without ever touching a server.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <Link href="/mock">
            <Button
              size="lg"
              className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-xs font-medium uppercase tracking-widest"
            >
              Launch Studio <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-32 grid grid-cols-1 gap-12 sm:grid-cols-3 text-left border-t border-border/60 pt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <Feature
            icon={<Code2 className="size-4" />}
            title="Multi-Format Support"
            description="Native support for JSON, XML, and Text. Smart validation ensures your payloads are served with the correct headers."
          />
          <Feature
            icon={<Zap className="size-4" />}
            title="Behavioral Control"
            description="Inject artificial delays up to 10s and custom HTTP status codes to test how your app handles the edge cases."
          />
          <Feature
            icon={<Globe className="size-4" />}
            title="Global Edge Delivery"
            description="Your mocks are served from the edge, providing high-availability and zero cold-start responses for your tests."
          />
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-border/60 flex justify-between items-center max-w-5xl mx-auto w-full">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
          Prototype faster with MockAPI.studio
        </p>
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
