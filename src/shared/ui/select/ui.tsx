import {
  Combobox,
  ComboboxProps,
  Flex,
  Input,
  InputBase,
  ScrollArea,
  Text,
  useCombobox,
  useMantineTheme,
} from "@mantine/core";
import { useMemo } from "react";

import Chevron from "@/../public/chevron.svg";

import styles from "./styles.module.css";

export type SelectOptionType = { value: string; name: string };

export type CustomSelectProps = ComboboxProps & {
  value?: string | null;
  label?: string;
  onChange?: (value: string) => void;
  placehoder?: string;
  options: SelectOptionType[];
  maw?: string | number | undefined;
  width?: string | number;
};

export function CustomSelect({
  label,
  value,
  options,
  placehoder,
  onChange,
  disabled,
  maw,
  width,
}: CustomSelectProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const theme = useMantineTheme();
  const selectedOption = useMemo(
    () => options.find(item => item.value === value),
    [options, value],
  );
  const optionItems = useMemo(
    () =>
      options.map(option => (
        <Combobox.Option
          style={t =>
            option.value === selectedOption?.value
              ? { background: t.colors.purple[2], color: t.white }
              : {}
          }
          value={option.value}
          key={option.value}
        >
          {option.name}
        </Combobox.Option>
      )),
    [options, selectedOption],
  );
  return (
    <Flex w={width} maw={maw} direction="column" rowGap={8}>
      <Text fw={700}>{label}</Text>
      <Combobox
        disabled={disabled}
        onOptionSubmit={val => {
          if (onChange) {
            onChange(val);
          }

          combobox.closeDropdown();
        }}
        classNames={{ option: styles.option }}
        store={combobox}
      >
        <Combobox.Target>
          <InputBase
            disabled={disabled}
            component="button"
            type="button"
            pointer
            classNames={{ input: styles.target }}
            rightSection={<Chevron />}
            rightSectionProps={{
              style: combobox.dropdownOpened
                ? {
                    color: theme.colors.purple[2],
                    rotate: "180deg",
                  }
                : { color: "inherit" },
            }}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
          >
            {selectedOption ? (
              <Text fz={14}>{selectedOption.name}</Text>
            ) : (
              <Input.Placeholder>{placehoder}</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            <ScrollArea.Autosize mah={200} type="auto" scrollbarSize={4}>
              {optionItems}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Flex>
  );
}
