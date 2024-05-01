"use client";

import { AppShell, useMantineTheme } from "@mantine/core";
import React from "react";

import { NavBar } from "@/widgets/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useMantineTheme();
  return (
    <AppShell navbar={{ width: 280, breakpoint: "md" }}>
      <NavBar />
      <AppShell.Main bg={theme.colors.slate[0]}>{children}</AppShell.Main>
    </AppShell>
  );
}
