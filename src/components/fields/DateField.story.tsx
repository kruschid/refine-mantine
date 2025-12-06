import { Stack } from "@mantine/core";
import { Meta } from "@storybook/react";
import "dayjs/locale/de";
import { DateField } from "./DateField";

export default {
  title: 'Fields/DateField',
  component: DateField,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof DateField>;

export const Default = () =>
  <DateField value="2025-12-05T14:41:31" />;

export const Small = () =>
  <DateField
    value="2025-12-05T14:41:31"
    textProps={{size: "xs"}}
  />;

export const Color = () =>
  <DateField
    value="2025-12-05T14:41:31"
    textProps={{ c: "teal" }}
  />;

export const Format = () =>
  <DateField
    value="2025-12-05T14:41:31"
    // https://day.js.org/docs/en/display/format
    format="LLLL"
  />;

export const Locale = () => (
  <DateField
    value="2025-12-05T14:41:31"
    // https://day.js.org/docs/en/display/format
    format="LLLL"
    // importing "dayjs/locale/de" is required to work properly 
    locale="de"
  />
);
