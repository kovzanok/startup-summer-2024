import { Flex, Title, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import logoSrc from "@/../public/logo.svg";

export function Logo() {
  const theme = useMantineTheme();
  return (
    <Flex href="/" component={Link} td="none" columnGap={12}>
      <Image src={logoSrc} alt="Logo" />
      <Title c={theme.colors.purple[2]} size={24} order={1}>
        ArrowFlicks
      </Title>
    </Flex>
  );
}
