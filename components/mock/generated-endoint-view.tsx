"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Globe, ExternalLink, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GeneratedEndpointView({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
        <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-4 border border-border/50">
          <Terminal className="size-5 text-muted-foreground/40" />
        </div>
        <h3 className="text-sm font-medium text-foreground tracking-tight">
          Awaiting Deployment
        </h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-52">
          Configure your payload and behavior to generate a live endpoint.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in zoom-in-95 fade-in duration-500">
      {/* 1. Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex size-2 items-center justify-center">
            {/* Emerald is kept for the "Live" status as it's a semantic signal, 
                but text uses foreground variable */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/40 opacity-75"></span>
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground">
            Endpoint Live on Edge
          </span>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] font-normal border-border bg-background"
        >
          SSL Secured
        </Badge>
      </div>

      {/* 2. The Asset Bar */}
      <div className="group relative flex items-center gap-2 rounded-xl border border-border bg-card p-1.5 pl-4 shadow-sm transition-all hover:border-border/80">
        <Globe className="size-3.5 text-muted-foreground/60 shrink-0" />
        <code className="flex-1 font-mono text-xs text-muted-foreground truncate pr-4">
          {url}
        </code>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
            onClick={() => window.open(url, "_blank")}
          >
            <ExternalLink className="size-3.5" />
          </Button>

          <Button
            onClick={copy}
            className={`h-8 px-4 rounded-lg text-[10px] font-medium uppercase tracking-widest transition-all duration-300 ${
              copied
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {copied ? (
              <Check className="mr-1.5 size-3 stroke-[3px]" />
            ) : (
              <Copy className="mr-1.5 size-3" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>

      {/* 3. Integration Hint */}
      <div className="rounded-lg bg-primary p-4 text-[11px] font-mono text-primary-foreground/60 leading-relaxed shadow-2xl">
        <div className="flex items-center gap-2 mb-2 text-primary-foreground/40">
          <div className="size-1.5 rounded-full bg-primary-foreground/20" />
          Quick Integration (cURL)
        </div>
        <span className="text-emerald-400">curl</span> -X GET <span className="text-primary-foreground">{url}</span>
      </div>
    </div>
  );
}