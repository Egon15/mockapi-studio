"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Zap, Clock, Code2, Globe } from "lucide-react";

export default function EndpointSettingsForm({
  settings,
  onChange,
  onSubmit,
}: {
  settings: {
    delayMs: number;
    statusCode: number;
    headers: Record<string, string>;
  };
  onChange: (v: {
    delayMs: number;
    statusCode: number;
    headers: Record<string, string>;
  }) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid gap-10">
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-foreground">
            <Clock className="size-4 text-muted-foreground/50" />
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
              max={5000}
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
            <Code2 className="size-4 text-muted-foreground/50" />
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
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Content Type
              </label>
              <Input
                disabled
                value="application/json"
                className="h-9 rounded-md border-input bg-muted/50 text-xs text-muted-foreground italic opacity-70"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="pt-8 flex items-center justify-between border-t border-border/60">
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-medium">
          <Globe className="size-3" />
          Ready for Edge Deployment
        </div>
        <Button
          onClick={onSubmit}
          className="h-10 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium uppercase tracking-widest transition-all hover:gap-3 group"
        >
          Generate Live Endpoint
          <Zap className="ml-2 size-3 fill-current transition-transform group-hover:scale-110" />
        </Button>
      </div>
    </div>
  );
}
