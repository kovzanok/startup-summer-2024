import { Flex, Text } from "@mantine/core";
import Image from "next/image";

import emptyMovieListSrc from "@/../public/empty-movie-list.png";

export function ListFallback() {
  return (
    <Flex direction="column" align="center" rowGap={16}>
      <Image src={emptyMovieListSrc} alt="No such movies" />
      <Text ta="center" fw={600} fz={20}>
        We don&apos;t have such movies, look for another one
      </Text>
    </Flex>
  );
}
