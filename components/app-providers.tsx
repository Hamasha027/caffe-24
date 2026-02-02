"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/components/language-provider";


export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange storageKey="theme">
      <LanguageProvider>
   
          {children}
   
      </LanguageProvider>
    </ThemeProvider>
  );
}
