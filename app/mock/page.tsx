"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import JsonInputForm from "@/components/mock/json-form-input";
import EndpointSettingsForm from "@/components/mock/endpoint-setting-form";
import GeneratedEndpointView from "@/components/mock/generated-endoint-view";

export default function MockPage() {
  const [activeTab, setActiveTab] = useState("input");
  const [jsonData, setJsonData] = useState<string>("");
  const [settings, setSettings] = useState({
    delayMs: 0,
    statusCode: 200,
    headers: {} as Record<string, string>,
  });
  const [generatedUrl, setGeneratedUrl] = useState<string>("");

  const handleGenerate = async () => {
    const res = await fetch("/api/mock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonData, settings }),
    });
    const data = await res.json();
    setGeneratedUrl(data.url);
    setActiveTab("result");
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-12 animate-in fade-in duration-700 bg-background text-foreground">
      {/* 1. Header & Stepper Index */}
      <header className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-medium tracking-tighter text-foreground">
            Configure Mock
          </h1>
          <p className="text-sm text-muted-foreground">
            Define your data structure and server behavior.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent h-auto p-0 flex justify-start gap-8 border-b border-border/40 w-full rounded-none">
            {[
              { value: "input", label: "01", title: "Payload" },
              { value: "settings", label: "02", title: "Behavior" },
              { value: "result", label: "03", title: "Deployment" },
            ].map((step) => (
              <TabsTrigger
                key={step.value}
                value={step.value}
                className="relative bg-transparent border-none p-0 pb-4 text-[11px] uppercase tracking-[0.2em] font-medium data-[state=active]:text-foreground text-muted-foreground rounded-none shadow-none transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-transparent data-[state=active]:after:bg-foreground"
              >
                <span className="mr-2 opacity-50 font-normal">
                  {step.label}
                </span>
                {step.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* 2. Content Sections */}
          <div className="mt-12">
            <TabsContent value="input" className="mt-0 outline-none">
              <div className="space-y-8">
                <JsonInputForm
                  jsonData={jsonData}
                  onChange={setJsonData}
                  onNext={() => setActiveTab("settings")}
                />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-0 outline-none">
              <EndpointSettingsForm
                settings={settings}
                onChange={setSettings}
                onSubmit={handleGenerate}
              />
            </TabsContent>

            <TabsContent value="result" className="mt-0 outline-none">
              <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-12">
                <GeneratedEndpointView url={generatedUrl} />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </header>

      {/* 3. Helper Context (Footer) */}
      <footer className="pt-12 border-t border-border/60 flex items-center gap-4">
        <Badge
          variant="outline"
          className="rounded-md border-border text-[10px] font-normal tracking-wide bg-background text-foreground"
        >
          Edge Network: Active
        </Badge>
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
          All endpoints auto-expire in 24 hours.
        </span>
      </footer>
    </div>
  );
}
