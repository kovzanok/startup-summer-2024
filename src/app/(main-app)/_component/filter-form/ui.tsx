import { Button, Flex, useMantineTheme } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useClearSearchParams } from "@/shared/hooks";

import { RatingRange } from "./components/rating-range";
import { YearSelect } from "./components/year-select";
import { FormProvider, useForm } from "./form-context";
import { useUpdateSearchParamsWithoutPage } from "./hooks";
import { FormValues } from "./types";

export function FilterForm() {
  const searchParams = useSearchParams();
  const theme = useMantineTheme();
  const initialValues = useMemo(
    () => ({
      primary_release_year: searchParams.get("primary_release_year") || "",
      minVote: Number(searchParams.get("vote_average.gte")) || "",
      maxVote: Number(searchParams.get("vote_average.lte")) || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const updateSearchParams = useUpdateSearchParamsWithoutPage();
  const clearSearchParams = useClearSearchParams();
  const form = useForm({
    mode: "uncontrolled",
    initialValues,
    validate: {
      minVote(value, values) {
        if (value && Number(value) > 10) {
          return "Should be less than 10";
        }
        if (value && Number(value) < 0) {
          return "Should be more than 0";
        }
        if (typeof value === "number" && typeof values.maxVote === "number") {
          return value > values.maxVote
            ? "Should be lower than max rating"
            : null;
        }
        return null;
      },
      maxVote(value, values) {
        if (value && Number(value) > 10) {
          return "Should be less than 10";
        }
        if (value && Number(value) < 0) {
          return "Should be more than 0";
        }
        if (typeof value === "number" && typeof values.minVote === "number") {
          return value < values.minVote
            ? "Should be higher than min rating"
            : null;
        }
        return null;
      },
    },
    validateInputOnChange: true,
  });
  const { getInputProps, onReset, values, setInitialValues } = form;
  const register = useCallback(
    (name: keyof FormValues) => {
      const { onChange, value, defaultValue } = getInputProps(name);
      return {
        onChange: (val: string) => {
          onChange(val);
          updateSearchParams(name, val);
        },
        value,
        defaultValue,
      };
    },
    [getInputProps, updateSearchParams],
  );

  return (
    <FormProvider form={form}>
      <form
        onReset={e => {
          setInitialValues({});
          onReset(e);
          clearSearchParams([
            ...Object.keys(values),
            "vote_average.gte",
            "vote_average.lte",
          ]);
        }}
      >
        <Flex align="flex-start" columnGap={16} my={24}>
          <YearSelect {...register("primary_release_year")} />
          <RatingRange />
          <Button
            pos="relative"
            top="50%"
            style={{ transform: "translateY(100%)" }}
            c={theme.colors.gray[1]}
            type="reset"
            w="fit-content"
            variant="transparent"
          >
            Reset filters
          </Button>
        </Flex>
      </form>
    </FormProvider>
  );
}
