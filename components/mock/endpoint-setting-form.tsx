"use client";

import { Button } from "@/components/ui/button";
import { SelectGroup, SelectLabel } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Zap, Clock, Code2, Globe, AlertCircle } from "lucide-react";

export const CONTENT_TYPES = [
  {
    label: "JSON",
    options: [
      { label: "application/json", value: "application/json" },
      { label: "application/problem+json", value: "application/problem+json" },
    ],
  },
  {
    label: "Forms",
    options: [
      {
        label: "application/x-www-form-urlencoded",
        value: "application/x-www-form-urlencoded",
      },
      { label: "multipart/form-data", value: "multipart/form-data" },
    ],
  },
  {
    label: "XML",
    options: [
      { label: "application/xml", value: "application/xml" },
      { label: "text/xml", value: "text/xml" },
    ],
  },
  {
    label: "Other",
    options: [
      { label: "text/plain", value: "text/plain" },
      { label: "text/csv", value: "text/csv" },
      { label: "application/octet-stream", value: "application/octet-stream" },
    ],
  },
] as const;

const isMismatched = (type: string, data: string) => {
  if (type.includes("json")) {
    try {
      JSON.parse(data);
      return false;
    } catch {
      return true;
    }
  }
  // You can add XML regex checks here if you want to be extra fancy
  return false;
};
const detectDataType = (data: string) => {
  const trimmed = data.trim();
  if (!trimmed) return "empty";

  // JSON Check
  try {
    JSON.parse(trimmed);
    return "json";
  } catch {}

  // XML Check (Basic Tag Match)
  const xmlPattern = /^<(\?xml|[\w\W]+)>[\w\W]*<\/[\w\W]+>$/i;
  if (xmlPattern.test(trimmed)) return "xml";

  return "text";
};

export default function EndpointSettingsForm({
  settings,
  payloadData,
  onChange,
  onSubmit,
  isGenerating,
}: {
  settings: {
    delayMs: number;
    statusCode: number;
    headers: Record<string, string>;
    contentType: string;
  };
  payloadData: string;
  onChange: (v: {
    delayMs: number;
    statusCode: number;
    headers: Record<string, string>;
    contentType: string;
  }) => void;
  onSubmit: () => void;
  isGenerating: boolean;
}) {
  const dataType = detectDataType(payloadData);

  const isJsonMismatched =
    settings.contentType.includes("json") && dataType !== "json";
  const isXmlMismatched =
    settings.contentType.includes("xml") && dataType !== "xml";

  // Critical: Serving structured data as plain text is okay,
  // but serving random text as JSON/XML will break client parsers.
  const isCriticalError =
    (settings.contentType.includes("json") && dataType === "text") ||
    (settings.contentType.includes("xml") && dataType === "json");

  const isSynced =
    (settings.contentType.includes("json") && dataType === "json") ||
    (settings.contentType.includes("xml") && dataType === "xml") ||
    (settings.contentType === "text/plain" && dataType === "text");
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid gap-10">
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-foreground">
            <Clock className="size-4 text-muted-foreground/60" />
            <h3 className="text-sm font-medium tracking-tight">
              Latency Simulation
            </h3>
          </div>
          <div className="space-y-4 rounded-xl border border-border/50 bg-muted/20 p-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Delay Duration
              </label>
              <span className="text-xs font-mono text-foreground bg-background px-2 py-0.5 rounded border border-border shadow-sm">
                {settings.delayMs}ms
              </span>
            </div>
            <Slider
              max={10000}
              step={100}
              value={[settings.delayMs]}
              onValueChange={([val]) => onChange({ ...settings, delayMs: val })}
              className="py-4 cursor-pointer"
            />
            <p className="text-xs text-muted-foreground/60 italic">
              Use this to test your frontend skeleton loaders and timeout logic.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 text-foreground">
            <Code2 className="size-4 text-muted-foreground/60" />
            <h3 className="text-sm font-medium tracking-tight">
              HTTP Specification
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl border border-border bg-card p-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Status Code
              </label>
              <Select
                value={String(settings.statusCode)}
                onValueChange={(val) =>
                  onChange({ ...settings, statusCode: Number(val) })
                }
              >
                <SelectTrigger className="h-9 rounded-md border-input bg-muted/30 text-xs focus:ring-1 focus:ring-ring">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="200" className="text-xs">
                    200 — OK
                  </SelectItem>
                  <SelectItem value="201" className="text-xs">
                    201 — Created
                  </SelectItem>
                  <SelectItem value="400" className="text-xs">
                    400 — Bad Request
                  </SelectItem>
                  <SelectItem value="401" className="text-xs">
                    401 — Unauthorized
                  </SelectItem>
                  <SelectItem value="404" className="text-xs">
                    404 — Not Found
                  </SelectItem>
                  <SelectItem value="500" className="text-xs">
                    500 — Server Error
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Response Content-Type
                </label>

                {isSynced ? (
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Synced with Source
                  </span>
                ) : isCriticalError ? (
                  <span className="text-[10px] bg-destructive/10 text-destructive px-2 py-0.5 rounded-full border border-destructive/20 animate-pulse">
                    Parsing Risk
                  </span>
                ) : (
                  <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/20">
                    Manual Override
                  </span>
                )}
              </div>

              <Select
                value={settings.contentType}
                onValueChange={(val) =>
                  onChange({ ...settings, contentType: val })
                }
              >
                <SelectTrigger
                  className={`w-full bg-zinc-950 transition-all ${
                    isCriticalError
                      ? "border-destructive ring-1 ring-destructive/20"
                      : "border-border"
                  }`}
                >
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-border">
                  {CONTENT_TYPES.map((group) => (
                    <SelectGroup key={group.label}>
                      <SelectLabel className="text-zinc-500 text-[10px] uppercase tracking-tighter">
                        {group.label}
                      </SelectLabel>
                      {group.options.map((opt) => {
                        // Logic: Block XML if we detected pure JSON to prevent crash
                        const blockXml =
                          opt.value.includes("xml") && dataType === "json";
                        // Logic: Block JSON if it's clearly not JSON
                        const blockJson =
                          opt.value.includes("json") && dataType === "text";

                        return (
                          <SelectItem
                            key={opt.value}
                            value={opt.value}
                            disabled={blockXml || blockJson}
                            className="text-xs"
                          >
                            <div className="flex items-center justify-between w-full gap-4">
                              <span>{opt.label}</span>
                              {(blockXml || blockJson) && (
                                <span className="text-[9px] opacity-50 italic">
                                  Incompatible
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>

              {/* Dynamic Error Messages */}
              {isCriticalError && (
                <div className="flex items-center gap-1.5 mt-2 text-destructive animate-in slide-in-from-top-1">
                  <AlertCircle className="size-3" />
                  <p className="text-[10px] font-medium">
                    The selected header will cause client-side parsing errors
                    with this payload.
                  </p>
                </div>
              )}

              {!isSynced && !isCriticalError && (
                <div className="flex items-center gap-1.5 mt-2 text-amber-500 italic animate-in slide-in-from-top-1">
                  <AlertCircle className="size-3" />
                  <p className="text-[10px]">
                    Note: Payload format differs from the standard{" "}
                    {settings.contentType.split("/")[1]} structure.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <div className="pt-8 flex items-center justify-between border-t border-border/60">
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-medium">
          <Globe
            className={`size-3 ${isCriticalError ? "text-destructive" : "text-emerald-500"}`}
          />
          {isCriticalError ? "Validation Failed" : "Ready for Edge Deployment"}
        </div>
        <Button
          onClick={onSubmit}
          className="h-10 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium uppercase tracking-widest transition-all hover:gap-3 group"
          disabled={isGenerating || isCriticalError} // Prevent deployment if broken
        >
          {isGenerating ? "Generating..." : "Generate Live Endpoint"}
          <Zap className="ml-2 size-3 fill-current transition-transform group-hover:scale-110" />
        </Button>
      </div>
    </div>
  );
}
