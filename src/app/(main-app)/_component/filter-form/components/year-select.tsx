import { CustomSelect, CustomSelectProps, SelectOptionType } from "@/shared/ui";

type YearSelectProps = Omit<
  CustomSelectProps,
  "label" | "placehoder" | "options"
> & { value?: string; defaultValue?: string };

const generateReleaseYearsArr = (start: number, end: number) => {
  const res: SelectOptionType[] = [];
  for (let i = start; i <= end; i += 1) {
    res.push({ name: String(i), value: String(i) });
  }
  return res.reverse();
};

const options = generateReleaseYearsArr(1874, new Date().getFullYear() + 8);

export function YearSelect({
  onChange,
  value,
  defaultValue,
  ...props
}: YearSelectProps) {
  return (
    <CustomSelect
      {...props}
      label="Release year"
      placehoder="Select release year"
      onChange={val => {
        if (onChange) {
          onChange(val);
        }
      }}
      value={value || defaultValue}
      options={options}
    />
  );
}
