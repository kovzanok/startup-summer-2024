import { Box, Flex, useMantineTheme } from "@mantine/core";

export function NotFoundSpectre() {
  const theme = useMantineTheme();
  return (
    <Flex>
      {theme.colors.notFound.map(color => (
        <Box key={color} w={93} h={50} bg={color} />
      ))}
    </Flex>
  );
}
