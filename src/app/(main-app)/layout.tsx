"use client";

import { AppShell } from "@mantine/core";
import React from "react";

import { NavBar } from "@/widgets/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell navbar={{ width: 280, breakpoint: "md" }}>
      <NavBar />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
