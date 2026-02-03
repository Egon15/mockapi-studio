import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Check, Copy, ExternalLink, PartyPopper, Clock } from "lucide-react";
import { useState } from "react";

export function DeploymentModal({
  isOpen,
  onClose,
  endpointUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  endpointUrl: string;
}) {
  const [copied, setCopied] = useState(false);

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 3);

  const formattedExpiry = expiryDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(endpointUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 border-border shadow-2xl">
        <DialogHeader className="flex flex-col items-center justify-center space-y-4">
          <div className="size-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <PartyPopper className="size-6 text-emerald-500" />
          </div>
          <div className="text-center">
            <DialogTitle className="text-xl font-medium tracking-tight">
              Endpoint Deployed
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Your mock API is now live and reachable from the edge.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="relative group">
            <div className="absolute -inset-2 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-2 bg-muted/40 p-3 rounded-lg border border-border overflow-hidden">
              <code className="text-xs font-mono text-emerald-400 truncate flex-1">
                {endpointUrl}
              </code>
              <Button
                size="icon"
                variant="ghost"
                className="size-8 shrink-0 hover:bg-background"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="size-3 text-emerald-500" />
                ) : (
                  <Copy className="size-3" />
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-10 text-xs font-medium uppercase tracking-widest border-border/60"
              onClick={() => window.open(endpointUrl, "_blank")}
            >
              Test Route <ExternalLink className="ml-2 size-3" />
            </Button>
            <Button
              className="h-10 text-xs font-medium uppercase tracking-widest bg-primary text-primary-foreground"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 px-1 text-xs text-muted-foreground italic border-t border-border/20 pt-4">
          <Clock className="size-4" />
          <span>
            This endpoint and its data will automatically expire on{" "}
            {formattedExpiry}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
