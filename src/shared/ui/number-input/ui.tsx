import { NumberInput, NumberInputProps } from "@mantine/core";

import styles from "./styles.module.css";

type CustomNumberInputProps = NumberInputProps;

export function CustomNumberInput({ ...props }: CustomNumberInputProps) {
  return (
    <NumberInput
      {...props}
      w="100%"
      classNames={{ input: styles.input }}
      styles={{ control: { border: "none" } }}
    />
  );
}
