"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";

import NotFoundTextSvg from "@/../public/not-found.svg";
import { Logo } from "@/shared/ui";

import { NotFoundSpectre } from "./_components/not-found-spectre";

export default function NotFoundPage() {
  const theme = useMantineTheme();
  return (
    <Box h="100vh" bg={theme.colors.slate[0]}>
      <header>
        <Container maw={1440} p={24}>
          <Logo />
        </Container>
      </header>
      <main style={{ height: "calc(100% - 160px)" }}>
        <Flex
          h="100%"
          direction="column"
          rowGap={48}
          justify="center"
          align="center"
        >
          <Flex direction="column" rowGap={28} align="center">
            <NotFoundSpectre />
            <NotFoundTextSvg />
            <NotFoundSpectre />
          </Flex>
          <Flex direction="column" rowGap={16} align="center">
            <Text fz={20} fw={600}>
              We can’t find the page you are looking for
            </Text>
            <Button
              bg={theme.colors.purple[2]}
              radius={8}
              href="/"
              component={Link}
              fw={600}
            >
              Go Home
            </Button>
          </Flex>
        </Flex>
      </main>
    </Box>
  );
}
