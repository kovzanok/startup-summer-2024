import { Button, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useClearSearchParams, useUpdateSearchParams } from "@/shared/hooks";

import { YearSelect } from "./components/year-select";

type FormValues = {
  primary_release_year?: string | null;
};

export function FilterForm() {
  const searchParams = useSearchParams();
  const initialValues = useMemo(
    () => ({
      primary_release_year: searchParams.get("primary_release_year"),
    }),
    [searchParams],
  );
  const updateSearchParams = useUpdateSearchParams();
  const clearSearchParams = useClearSearchParams();
  const { getInputProps, reset, onReset, values } = useForm<FormValues>({
    initialValues,
  });

  const register = useCallback(
    (name: keyof FormValues) => {
      const { onChange, value } = getInputProps(name);
      return {
        onChange: (val: string) => {
          onChange(val);
          updateSearchParams(name, val);
        },
        value,
      };
    },
    [getInputProps, updateSearchParams],
  );

  return (
    <form
      onReset={e => {
        clearSearchParams(Object.keys(values));
        onReset(e);
      }}
    >
      <Flex align="flex-end" columnGap={16} my={24}>
        <YearSelect {...register("primary_release_year")} />
        <Button
          onClick={reset}
          type="reset"
          w="fit-content"
          variant="transparent"
        >
          Reset filters
        </Button>
      </Flex>
    </form>
  );
}
