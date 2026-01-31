"use client";

import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Braces, AlertCircle, ArrowRight, FileCode } from "lucide-react";

const getValidationSchema = (contentType: string) =>
  z
    .string()
    .min(1, "Please enter your payload")
    .refine((val) => {
      if (!contentType.includes("json")) return true; // Skip JSON check for XML/Text
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    }, "Invalid JSON syntax. Please check for trailing commas or missing quotes.");

const getPlaceholder = (type: string) => {
  switch (type) {
    case "application/json":
      return `{\n  "status": "success",\n  "message": "Hello from MockAPI",\n  "data": { "id": 1 }\n}`;
    case "application/xml":
      return `<?xml version="1.0" encoding="UTF-8"?>\n<response>\n  <status>success</status>\n  <message>Hello from MockAPI</message>\n</response>`;
    case "text/plain":
      return `Hello World!\nThis is a plain text mock response.`;
    default:
      return "Enter your mock data here...";
  }
};

export default function JsonInputForm({
  payloadData,
  onChange,
  onNext,
  contentType,
  onTypeChange,
}: {
  payloadData: string;
  onChange: (v: string) => void;
  onNext: () => void;
  contentType: string;
  onTypeChange: (v: string) => void;
}) {
  const [error, setError] = useState("");

  const handleNext = () => {
    const schema = getValidationSchema(contentType);
    const result = schema.safeParse(payloadData);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="space-y-6 ...">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileCode className="size-4 text-muted-foreground/60" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Source Definition
            </span>
          </div>

          {/* Subtle Segmented Picker for Format */}
          <div className="flex bg-muted/50 p-1 rounded-md border border-border/50">
            {["application/json", "text/plain", "application/xml"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => onTypeChange(type)}
                  className={`px-3 py-1 text-xs uppercase tracking-wider rounded-sm transition-all ${
                    contentType === type
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {type.split("/")[1]}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground font-mono italic uppercase">
          {contentType.split("/")[1]} / UTF-8
        </div>
      </div>

      <div className="relative group transition-all duration-500">
        {/* The "Better Auth" style soft blur/ring glow */}
        <div className="absolute -inset-px rounded-xl opacity-0 group-focus-within:opacity-100 group-focus-within:ring-1 group-focus-within:ring-border/50 group-focus-within:bg-muted/5 transition-all duration-500 pointer-events-none" />

        <div className="relative flex flex-col rounded-xl border border-border bg-zinc-950 shadow-2xl overflow-hidden transition-all duration-500 group-focus-within:border-border/80">
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/5 bg-white/5">
            <div className="size-2 rounded-full bg-white/10" />
            <div className="size-2 rounded-full bg-white/10" />
            <div className="size-2 rounded-full bg-white/10" />
          </div>

          <Textarea
            value={payloadData}
            onChange={(e) => {
              onChange(e.target.value);
              if (error) setError("");
            }}
            className="min-h-96 border-none bg-transparent font-mono text-sm leading-relaxed text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-0 p-6 resize-none transition-all duration-500"
            placeholder={getPlaceholder(contentType)}
          />

          {/* Subtle "Active" Indicator - Matching your Tab's scale-x underline */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-1/3 bg-primary/50 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700 ease-in-out" />
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
            <div className="flex items-center gap-2 text-muted-foreground/60 animate-in fade-in duration-500">
              {/* Dynamic Icon based on type */}
              {contentType.includes("json") ? (
                <Braces className="size-3.5" />
              ) : (
                <FileCode className="size-3.5" />
              )}

              <p className="text-xs">
                {contentType === "application/json" &&
                  "Payload will be parsed as a structured JSON object."}
                {contentType === "application/xml" &&
                  "Payload will be served as a formatted XML document."}
                {contentType === "text/plain" &&
                  "Payload will be served as raw, unformatted text."}
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
