import { Box, Button, Input, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSearchParams } from "next/navigation";

import SearchIcon from "@/../public/search.svg";
import { useUpdateSearchParams } from "@/shared/hooks";

type FormValue = { search: string };

export function SearchForm() {
  const theme = useMantineTheme();
  const updateSearchParms = useUpdateSearchParams();
  const searchParams = useSearchParams();
  const { onSubmit, getInputProps } = useForm<FormValue>({
    initialValues: { search: searchParams.get("search") || "" },
  });
  const handleSubmit = ({ search }: FormValue) => {
    updateSearchParms("search", search);
  };
  return (
    <Box maw={{ base: "100%", xs: "50%" }} w="100%">
      <form onSubmit={onSubmit(handleSubmit)}>
        <Input
          {...getInputProps("search")}
          radius={8}
          styles={{ input: { padding: "24px 0", paddingLeft: "32px" } }}
          leftSection={<SearchIcon />}
          rightSection={
            <Button
              type="submit"
              radius={8}
              bg={theme.colors.purple[2]}
              px={20}
              py={6}
            >
              Search
            </Button>
          }
          rightSectionPointerEvents="all"
          rightSectionWidth={100}
          placeholder="Search movie title"
        />
      </form>
    </Box>
  );
}
