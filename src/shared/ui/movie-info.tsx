import { Flex, Rating, Text, Title, useMantineTheme } from "@mantine/core";

import { roundVotesCount } from "../lib";
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
      <Text lh="20px" c={theme.colors.slate[1]}>
        {new Date(release_date).getFullYear()}
      </Text>
      <Flex align="center" columnGap={4}>
        <Rating size={28} count={1} readOnly value={vote_average} />
        <Text fw={600} lh="20px">
          {vote_average.toFixed(1)}
        </Text>
        <Text c={theme.colors.slate[1]} ml={4}>
          ({roundVotesCount(vote_count)})
        </Text>
      </Flex>
    </Flex>
  );
}
