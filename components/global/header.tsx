"use client";

import Link from "next/link";
import { Command } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Command className="size-3.5" />
            </div>
            <span className="text-sm font-medium tracking-tighter text-foreground">
              MockAPI
              <span className="text-muted-foreground font-normal">.studio</span>
            </span>
          </Link>
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors text-xs font-medium uppercase tracking-widest"
          >
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}
