import { Stack } from "@mantine/core";
import { Meta } from "@storybook/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { BooleanField } from "./BooleanField";

export default {
  title: 'Fields/BooleanField',
  component: BooleanField,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof BooleanField>;

export const Default = () =>
  <BooleanField value={true} />;

export const CustomLabel = () =>
  <BooleanField
    value={false}
    falseLabel="Value not selected"
    trueLabel="Value selected"
  />;

export const CustomIcon = () =>
  <BooleanField
    value={false}
    falseIcon={<IconX />}
    trueIcon={<IconCheck />}
  />;

export const CustomColor = () =>
  <BooleanField
    value={false}
    falseIconProps={{ fill: "red" }}
    trueIconProps={{ fill: "green" }}
  />;
