import { Button, Flex, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useClearSearchParams } from "@/shared/hooks";

import { YearSelect } from "./components/year-select";
import { useUpdateSearchParamsWithoutPage } from "./hooks";

type FormValues = {
  primary_release_year?: string | null;
};

export function FilterForm() {
  const searchParams = useSearchParams();
  const theme = useMantineTheme();
  const initialValues = useMemo(
    () => ({
      primary_release_year: searchParams.get("primary_release_year"),
    }),
    [searchParams],
  );
  const updateSearchParams = useUpdateSearchParamsWithoutPage();
  const clearSearchParams = useClearSearchParams();
  const { getInputProps, reset, onReset, values, setInitialValues } =
    useForm<FormValues>({
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
        setInitialValues({});
        onReset(e);
        clearSearchParams(Object.keys(values));
      }}
    >
      <Flex align="flex-end" columnGap={16} my={24}>
        <YearSelect {...register("primary_release_year")} />
        <Button
          c={theme.colors.gray[1]}
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
