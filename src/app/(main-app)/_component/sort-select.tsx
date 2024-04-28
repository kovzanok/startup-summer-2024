import { Box } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import React from "react";

import { useUpdateSearchParams } from "@/shared/hooks";
import { CustomSelect, SelectOptionType } from "@/shared/ui";

const options: SelectOptionType[] = [
  { value: "popularity.asc", name: "Least Popular" },
  { value: "popularity.desc", name: "Most Popular" },
  { value: "revenue.asc", name: "Lowest Revenue" },
  { value: "revenue.desc", name: "Highest Revenue" },
  { value: "primary_release_date.asc", name: "Latest Release Date" },
  { value: "primary_release_date.desc", name: "Earliest Release Date" },
  { value: "title.asc", name: "Title (A-Z)" },
  { value: "title.desc", name: "Title (Z-A)" },
  { value: "vote_average.asc", name: "Least Rated" },
  { value: "vote_average.desc", name: "Most Rated" },
  { value: "vote_count.asc", name: "Least Voted" },
  { value: "vote_count.desc", name: "Most Voted" },
];

export function SortSelect() {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const handleChange = (value: string) => {
    updateSearchParams("sort_by", value);
  };
  return (
    <Box mb={24} ml="auto" maw={284}>
      <CustomSelect
        initialValue={
          options.find(o => o.value === searchParams.get("sort_by"))
            ? searchParams.get("sort_by")
            : "popularity.desc"
        }
        onChange={handleChange}
        options={options}
        label="Sort by"
      />
    </Box>
  );
}
