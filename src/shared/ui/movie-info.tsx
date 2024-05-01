import { Flex, Text, Title, useMantineTheme } from "@mantine/core";

import StartIcon from "@/../public/star.svg";

import { Movie } from "../types";

type MovieInfoProps = Pick<
  Movie,
  "title" | "release_date" | "vote_average" | "vote_count"
>;

export function MovieInfo({
  title,
  release_date,
  vote_average,
  vote_count,
}: MovieInfoProps) {
  const theme = useMantineTheme();
  return (
    <Flex direction="column" rowGap={8}>
      <Title order={3} fz={20} lh="24px" fw={600} c={theme.colors.purple[2]}>
        {title}
      </Title>
      <Text lh="20px" c={theme.colors.gray[1]}>
        {new Date(release_date).getFullYear()}
      </Text>
      <Flex align="center" columnGap={4}>
        <StartIcon color={theme.colors.yellow[0]} />
        <Text fw={600} lh="20px">
          {vote_average.toFixed(1)}
        </Text>
        <Text c={theme.colors.slate[1]} ml={4}>
          ({vote_count})
        </Text>
      </Flex>
    </Flex>
  );
}
