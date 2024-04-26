"use client";

import { AppShell, Flex, useMantineTheme } from "@mantine/core";

import { Logo } from "./components/logo";
import { NavLink } from "./components/nav-link";
import { links } from "./const";

export function NavBar() {
  const theme = useMantineTheme();
  return (
    <AppShell.Navbar
      style={{ rowGap: "80px" }}
      bg={theme.colors.purple[0]}
      p={24}
    >
      <Logo />
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
