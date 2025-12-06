import { Text, TextProps } from "@mantine/core";
import type { ConfigType } from "dayjs";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

export interface DateFieldProps {
  value: ConfigType;
  locale?: string;
  format?: string;
  textProps?: TextProps;
}

dayjs.extend(LocalizedFormat);
const defaultLocale = dayjs.locale();

export const DateField: React.FC<DateFieldProps> = ({
  value,
  locale,
  format: dateFormat = "L",
  textProps,
}) => (
  <Text {...textProps}>
    {value
      ? dayjs(value)
          .locale(locale ?? defaultLocale)
          .format(dateFormat)
      : ""}
  </Text>
);
