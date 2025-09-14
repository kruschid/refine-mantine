import { Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { ListButton } from "./ListButton";

export default {
  title: 'Buttons/ListButton',
  component: ListButton,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof ListButton>;

export const WithText = () =>
  <ListButton resource="product" />;

export const HideText = () =>
  <ListButton hideText />;

export const Disabled = () =>
  <ListButton
    resource="product"    
    disabled
  />;