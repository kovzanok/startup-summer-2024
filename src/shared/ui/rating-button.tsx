import { ActionIcon, Text, useMantineTheme } from "@mantine/core";
import { MouseEventHandler } from "react";

import StarIcon from "@/../public/star.svg";

type RatingButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  userRating?: number;
};

export function RatingButton({ userRating, onClick }: RatingButtonProps) {
  const theme = useMantineTheme();
  return (
    <ActionIcon
      w="fit-content"
      onClick={onClick}
      ml="auto"
      variant="transparent"
      styles={{ root: { overflow: "visible" } }}
    >
      <StarIcon
        size={28}
        color={userRating ? theme.colors.purple[2] : theme.colors.slate[2]}
      />
      {Boolean(userRating) && (
        <Text fw={600} c="black">
          {userRating}
        </Text>
      )}
    </ActionIcon>
  );
}
