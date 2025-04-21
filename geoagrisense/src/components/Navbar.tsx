"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Leaf, Map as MapIcon, Upload, FileBarChart, Settings, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/", icon: <Leaf className="w-5 h-5 mr-2" /> },
    { label: "Map Analysis", href: "/map", icon: <MapIcon className="w-5 h-5 mr-2" /> },
    { label: "Upload Data", href: "/upload", icon: <Upload className="w-5 h-5 mr-2" /> },
    { label: "Reports", href: "/reports", icon: <FileBarChart className="w-5 h-5 mr-2" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="w-5 h-5 mr-2" /> },
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="font-poppins text-xl font-semibold tracking-tight text-primary">
              GeoAgriSense
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center py-2 px-3 text-muted-foreground rounded-md transition-smooth hover:bg-accent hover:text-accent-foreground"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                      <Leaf className="w-6 h-6 text-primary" />
                      <span className="font-semibold text-lg">GeoAgriSense</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>

                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center py-3 px-4 rounded-md transition-smooth hover:bg-accent hover:text-accent-foreground"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
