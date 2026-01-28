"use client";

import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Braces, AlertCircle, ArrowRight, FileCode } from "lucide-react";

const jsonSchema = z.string().refine((val) => {
  try {
    JSON.parse(val);
    return true;
  } catch {
    return false;
  }
}, "Invalid JSON syntax. Please check for trailing commas or missing quotes.");

export default function JsonInputForm({
  jsonData,
  onChange,
  onNext,
}: {
  jsonData: string;
  onChange: (v: string) => void;
  onNext: () => void;
}) {
  const [error, setError] = useState("");

  const handleNext = () => {
    const result = jsonSchema.safeParse(jsonData);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <FileCode className="size-4 text-muted-foreground/60" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Source Definition
          </span>
        </div>
        <div className="text-xs text-muted-foreground/50 font-mono italic">
          UTF-8 / JSON
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-linear-to-b from-border to-transparent rounded-xl opacity-20 blur-[2px] transition-opacity group-focus-within:opacity-100" />

        <div className="relative flex flex-col rounded-xl border border-border bg-zinc-950 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/5 bg-white/5">
            <div className="size-2 rounded-full bg-white/10" />
            <div className="size-2 rounded-full bg-white/10" />
            <div className="size-2 rounded-full bg-white/10" />
          </div>

          <Textarea
            value={jsonData}
            onChange={(e) => {
              onChange(e.target.value);
              if (error) setError("");
            }}
            className="min-h-96 border-none bg-transparent font-mono text-sm leading-relaxed text-zinc-300 placeholder:text-zinc-700 focus-visible:ring-0 p-6 resize-none"
            placeholder={`{\n  "id": 1,\n  "status": "success",\n  "data": { ... }\n}`}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
        <div className="flex-1">
          {error ? (
            <div className="flex items-center gap-2 text-destructive animate-in fade-in slide-in-from-left-2">
              <AlertCircle className="size-3.5" />
              <p className="text-xs font-medium tracking-tight">{error}</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <Braces className="size-3.5" />
              <p className="text-xs">
                Valid JSON will be parsed into a RESTful structure.
              </p>
            </div>
          )}
        </div>

        <Button
          onClick={handleNext}
          className="h-10 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all group text-xs font-medium uppercase tracking-widest"
        >
          Validate & Continue
          <ArrowRight className="ml-2 size-3.5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
