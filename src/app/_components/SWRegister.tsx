"use client";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function SWRegister() {
  const [defferedPrompt, setDefferedPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("✅ Service worker registered:", reg.scope);
        })
        .catch((err) => {
          console.error("❌ Service worker registration failed:", err);
        });
    }

    window.addEventListener("beforeinstallprompt", (event) => {
      console.log("beforeinstallprompt", event);
      setIsInstallable(true);
      setDefferedPrompt(event as BeforeInstallPromptEvent);
    });
  }, []);

  const handleInstall = () => {
    if (defferedPrompt && isInstallable) {
      void defferedPrompt.prompt();
    }
  };

  return (
    <Button
      onClick={handleInstall}
      className="absolute z-[999999999]"
      style={{ pointerEvents: "all" }}
    >
      {isInstallable ? "Install" : "Cry"}
    </Button>
  );
}
