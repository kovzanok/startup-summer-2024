"use client";

import { AppShell, Burger, Flex, Group, useMantineTheme } from "@mantine/core";

import { Logo } from "@/shared/ui";

import { NavLink } from "./components/nav-link";
import { links } from "./const";

type NavBarProps = {
  close: () => void;
};

export function NavBar({ close }: NavBarProps) {
  const theme = useMantineTheme();
  return (
    <AppShell.Navbar
      style={{ rowGap: "80px" }}
      bg={theme.colors.purple[0]}
      p={24}
    >
      <Group justify="space-between">
        <Logo />
        <Burger hiddenFrom="sm" opened onClick={close} />
      </Group>
      <Flex direction="column" rowGap={16}>
        {links.map(({ href, title }) => (
          <NavLink key={href} href={href}>
            {title}
          </NavLink>
        ))}
      </Flex>
    </AppShell.Navbar>
  );
}
