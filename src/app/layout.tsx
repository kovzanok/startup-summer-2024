"use client";

import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import React from "react";

import { RatingProvider } from "@/shared/context";
import { theme } from "@/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <RatingProvider>{children}</RatingProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
