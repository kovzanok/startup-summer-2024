"use client";

import { AppShell, Burger, Group, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import React from "react";

import { Logo } from "@/shared/ui";
import { NavBar } from "@/widgets/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useMantineTheme();
  const isTablet = useMediaQuery("(min-width: 768px)");
  const [opened, { toggle, close }] = useDisclosure();
  return (
    <AppShell
      layout="alt"
      withBorder={false}
      header={{ height: 52, collapsed: isTablet }}
      navbar={{ width: 280, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        <Group p={12} justify="space-between">
          <Logo />
          <Burger opened={opened} onClick={toggle} size="sm" />
        </Group>
      </AppShell.Header>
      <NavBar close={close} />
      <AppShell.Main bg={theme.colors.slate[0]}>{children}</AppShell.Main>
    </AppShell>
  );
}
