"use client";

import React from "react";
import "./globals.css";
import { Roboto } from "next/font/google";
import ThemeRegistry from "@/utils/themeRegistry";
import { AuthProvider } from "@/contexts/AuthContext";
import { SnackbarProvider } from "@/components/feedback/SnackbarContext";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
});

const ParentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <ThemeRegistry>
          <SnackbarProvider>
            <AuthProvider>{children}</AuthProvider>
          </SnackbarProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default ParentLayout;
