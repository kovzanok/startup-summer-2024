import { Button, Flex, Text, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import emptyMovieListSrc from "@/../public/empty-rated-list.png";

export function RatedFallback() {
  const theme = useMantineTheme();
  return (
    <Flex direction="column" align="center" rowGap={16}>
      <Image src={emptyMovieListSrc} alt="No such movies" />
      <Text fw={600} fz={20}>
        You haven&apos;t rated any films yet
      </Text>
      <Button bg={theme.colors.purple[2]} href="/" component={Link}>
        Find movies
      </Button>
    </Flex>
  );
}
