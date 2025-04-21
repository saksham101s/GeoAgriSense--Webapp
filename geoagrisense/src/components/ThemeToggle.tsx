"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { SunIcon, MoonIcon } from "lucide-react";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initialize based on current theme
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    if (typeof window !== "undefined" && window.toggleTheme) {
      window.toggleTheme();
      setIsDarkMode(!isDarkMode);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <SunIcon className="h-4 w-4 text-muted-foreground" />
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <MoonIcon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}
