import { Flex, Text } from "@mantine/core";
import { useCallback } from "react";

import { CustomNumberInput } from "@/shared/ui";

import { useFormContext } from "../form-context";
import { useUpdateSearchParamsWithoutPage } from "../hooks";

const nameToValidate: { maxVote: "minVote"; minVote: "maxVote" } = {
  maxVote: "minVote",
  minVote: "maxVote",
};

const searchParamsName = {
  maxVote: "vote_average.lte",
  minVote: "vote_average.gte",
};

export function RatingRange() {
  const { getInputProps, validateField, isValid, key } = useFormContext();
  const updateSearchParams = useUpdateSearchParamsWithoutPage();
  const register = useCallback(
    (name: "maxVote" | "minVote") => {
      const { onChange, error, onBlur, defaultValue } = getInputProps(name);
      return {
        onChange: (val: string | number) => {
          onChange(val);
          validateField(nameToValidate[name]);
          if (isValid()) {
            updateSearchParams(searchParamsName[name], val);
          }
        },
        defaultValue,
        error,
        onBlur,
      };
    },
    [getInputProps, updateSearchParams, isValid, validateField],
  );
  return (
    <Flex maw={284} w="100%" direction="column" rowGap={8}>
      <Text fw={700}>Ratings</Text>
      <Flex columnGap={8}>
        <CustomNumberInput
          key={key("minVote")}
          {...register("minVote")}
          min={0}
          max={10}
          placeholder="From"
        />
        <CustomNumberInput
          key={key("maxVote")}
          {...register("maxVote")}
          min={0}
          max={10}
          placeholder="To"
        />
      </Flex>
    </Flex>
  );
}
