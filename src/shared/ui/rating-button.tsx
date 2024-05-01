import { ActionIcon, Rating, Text, useMantineTheme } from "@mantine/core";
import { MouseEventHandler } from "react";

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
      <Rating
        styles={{ label: { cursor: "pointer" } }}
        size={28}
        readOnly
        value={userRating}
        color={theme.colors.purple[2]}
        count={1}
      />
      {Boolean(userRating) && (
        <Text fw={600} c="black">
          {userRating}
        </Text>
      )}
    </ActionIcon>
  );
}
