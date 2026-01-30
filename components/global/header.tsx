"use client";

import Link from "next/link";
import { ArrowUpRight, Command } from "lucide-react";
import { Github } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Command className="size-3.5" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-foreground">
              MockAPI
              <span className="text-muted-foreground font-light ml-0.5">
                .studio
              </span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/Egon15/mockapi-studio"
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-all duration-300 text-xs font-medium uppercase tracking-widest flex items-center group"
          >
            Source
            <ArrowUpRight className="ml-1 size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
