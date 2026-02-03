"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import PayloadInputForm from "@/components/mock/payload-input-form";
import EndpointSettingsForm from "@/components/mock/endpoint-setting-form";
import { DeploymentModal } from "@/components/mock/deployment-modal";

export default function MockPage() {
  const [activeTab, setActiveTab] = useState("input");

  // Core Data State
  const [payloadData, setPayloadData] = useState<string>("");
  const [settings, setSettings] = useState({
    delayMs: 0,
    statusCode: 200,
    headers: {} as Record<string, string>,
    contentType: "application/json",
  });

  // System State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState({
    status: "connecting",
    region: "",
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState("");

  const handleTypeChange = (newType: string) => {
    setSettings((prev) => ({ ...prev, contentType: newType }));
  };

  // Health Check
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch("/api/health");
        const data = await res.json();
        setSystemStatus({ status: data.status, region: data.region });
      } catch (err) {
        setSystemStatus({ status: "offline", region: "" });
      }
    };
    checkHealth();
  }, []);

  // Deploy Function
  const handleDeploy = async () => {
    setIsGenerating(true);
    try {
      const isUpdate = !!currentId;

      const res = await fetch("/api/mock", {
        method: isUpdate ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payloadData, settings, id: currentId }),
      });

      const data = await res.json();

      if (res.ok) {
        // Update local state so subsequent clicks become updates
        if (!isUpdate) {
          setCurrentId(data.id);
        }

        // Construct URL and Open Modal
        const fullUrl = `${window.location.origin}/api/mock/${data.id}`;
        setDeployedUrl(fullUrl);
        setIsModalOpen(true);
      } else {
        // TODO : Replace this with a toast notification
        alert(data.error || "Failed to create mock API");
      }
    } catch (error) {
      console.error("Operation failed: ", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700 text-foreground bg-background">
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
            ].map((step) => (
              <TabsTrigger
                key={step.value}
                value={step.value}
                className="relative flex items-center px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-sm
               text-muted-foreground data-[state=active]:text-foreground 
               data-[state=active]:bg-muted/40 data-[state=active]:ring-1 data-[state=active]:ring-border/50
               after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-1/3 after:-translate-x-1/2 after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 
               data-[state=active]:after:scale-x-100"
              >
                <span className="mr-2 opacity-40 font-normal transition-opacity data-[state=active]:opacity-100">
                  {step.label}
                </span>
                {step.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-12">
            <TabsContent value="input" className="mt-0 outline-none">
              <PayloadInputForm
                payloadData={payloadData}
                onChange={setPayloadData}
                contentType={settings.contentType}
                onTypeChange={handleTypeChange}
                onNext={() => setActiveTab("settings")}
              />
            </TabsContent>

            <TabsContent value="settings" className="mt-0 outline-none">
              <EndpointSettingsForm
                settings={settings}
                payloadData={payloadData}
                onChange={setSettings}
                onSubmit={handleDeploy}
                isGenerating={isGenerating}
              />
            </TabsContent>
          </div>
        </Tabs>
      </header>

      <DeploymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        endpointUrl={deployedUrl}
      />

      <footer className="pt-12 border-t border-border/60 flex items-center gap-4">
        <Badge
          variant="outline"
          className="rounded-md border-border py-1 px-3 text-xs font-normal tracking-wide bg-background flex items-center gap-2"
        >
          <span className="relative flex size-2">
            {systemStatus.status === "online" && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex size-2 rounded-full ${
                systemStatus.status === "online"
                  ? "bg-emerald-500"
                  : "bg-zinc-600"
              }`}
            ></span>
          </span>
          <span className="text-muted-foreground uppercase tracking-tight">
            {systemStatus.status === "online"
              ? `System Operational  •  ${systemStatus.region}`
              : "System Offline"}
          </span>
        </Badge>
      </footer>
    </div>
  );
}
