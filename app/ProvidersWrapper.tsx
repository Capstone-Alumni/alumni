"use client"

import { ThemeProvider, useTheme } from "@mui/material";
import { SessionProvider } from "next-auth/react";

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        {children} {/* Our entire app -> has access to NextAuth */}
      </SessionProvider>
    </ThemeProvider>
  )
}
