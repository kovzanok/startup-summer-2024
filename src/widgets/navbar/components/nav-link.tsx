"use client";

import { Box, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler, PropsWithChildren, useMemo } from "react";

import { LinkData } from "../types";

type NavLinkProps = Pick<LinkData, "href"> & {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function NavLink({
  href,
  children,
  onClick,
}: PropsWithChildren<NavLinkProps>) {
  const pathname = usePathname();
  const theme = useMantineTheme();
  const isActive = useMemo(
    () => pathname === href || (href === "/" && pathname !== "/rated"),
    [pathname, href],
  );
  return (
    <Box
      onClick={onClick}
      p={10}
      td="none"
      style={{ borderRadius: "8px" }}
      bg={isActive ? theme.colors.purple[1] : ""}
      href={href}
      component={Link}
      fw={isActive ? 700 : 400}
      c={isActive ? theme.colors.purple[2] : theme.black}
    >
      {children}
    </Box>
  );
}
