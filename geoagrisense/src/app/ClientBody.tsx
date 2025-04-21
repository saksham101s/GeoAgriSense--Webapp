"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

// Extend Window interface to include toggleTheme
declare global {
  interface Window {
    toggleTheme: () => void;
  }
}

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (savedTheme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Make theme available globally for components to use
  useEffect(() => {
    if (theme) {
      window.toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      };
    }
  }, [theme]);

  return (
    <body
      className="antialiased font-sans min-h-screen"
      suppressHydrationWarning
    >
      {children}
      <Toaster position="top-right" richColors closeButton />
    </body>
  );
}
