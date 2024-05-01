import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalBaseProps,
  Rating,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";

import { MovieRating, RatedMovie } from "@/shared/types";

type MovieRatingModalProps = ModalBaseProps & {
  movie: RatedMovie | null;
  rateMovie: (rating: MovieRating) => void;
};

export function MovieRatingModal({
  movie,
  onClose,
  rateMovie,
  ...props
}: MovieRatingModalProps) {
  const theme = useMantineTheme();
  const [value, setValue] = useState(movie?.rating || 0);

  useEffect(() => {
    setValue(movie?.rating || 0);
  }, [movie?.rating]);

  const handleClose = () => {
    onClose();
    setValue(0);
  };

  return (
    <Modal.Root keepMounted={false} centered onClose={handleClose} {...props}>
      <Modal.Overlay />
      <Modal.Content w="100%" maw="380px">
        <Modal.Header>
          <Text fw={700}>Your rating</Text> <Modal.CloseButton />
        </Modal.Header>
        <Divider />
        <Modal.Body p={16}>
          <Flex direction="column" rowGap={16}>
            <Text fw={700}>{movie?.title}</Text>
            <Rating
              value={value}
              onChange={val => setValue(val === value ? 0 : val)}
              w="100%"
              styles={{
                root: { display: "flex", justifyContent: "space-between" },
              }}
              count={10}
              size={28}
            />
            <Button
              onClick={() => {
                if (movie) {
                  rateMovie({ id: movie.id, rating: value });
                }
                handleClose();
              }}
              w="fit-content"
              radius="8px"
              bg={theme.colors.purple[2]}
            >
              Save
            </Button>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
