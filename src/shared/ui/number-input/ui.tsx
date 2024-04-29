import { NumberInput, NumberInputProps } from "@mantine/core";

import styles from "./styles.module.css";

type CustomNumberInputProps = NumberInputProps;

export function CustomNumberInput({ ...props }: CustomNumberInputProps) {
  return (
    <NumberInput
      {...props}
      classNames={{ input: styles.input }}
      styles={{ control: { border: "none" } }}
    />
  );
}
