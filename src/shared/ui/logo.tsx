"use client";

import { Flex, Title, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { MouseEventHandler } from "react";

import LogoIcon from "@/../public/logo.svg";

type LogoProps = { onClick?: MouseEventHandler<HTMLDivElement> };

export function Logo({ onClick }: LogoProps) {
  const theme = useMantineTheme();
  return (
    <Flex onClick={onClick} href="/" component={Link} td="none" columnGap={12}>
      <LogoIcon />
      <Title c={theme.colors.purple[2]} size={24} order={1}>
        ArrowFlicks
      </Title>
    </Flex>
  );
}
