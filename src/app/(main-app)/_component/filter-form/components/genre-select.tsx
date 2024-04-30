import React from "react";
import useSWR from "swr";

import { fetcher } from "@/shared/lib";
import { GenreRes } from "@/shared/types";
import { CustomSelect, CustomSelectProps } from "@/shared/ui";

type GenreSelectProps = Omit<
  CustomSelectProps,
  "label" | "placehoder" | "options"
> & { value?: string; defaultValue?: string };

export function GenreSelect({
  onChange,
  value,
  defaultValue,
  ...props
}: GenreSelectProps) {
  const { data: genres } = useSWR<GenreRes>("/genre/movie/list", fetcher);
  return (
    <CustomSelect
      {...props}
      label="Genre"
      placehoder="Select genre"
      options={
        genres?.genres.map(({ id, name }) => ({
          value: String(id),
          name,
        })) || []
      }
      onChange={val => {
        if (onChange) {
          onChange(val);
        }
      }}
      disabled={!genres}
      value={value || defaultValue}
    />
  );
}
