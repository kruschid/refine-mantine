import { Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { CreateButton } from "./CreateButton";

export default {
  title: 'Buttons/CreateButton',
  component: CreateButton,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof CreateButton>;

export const WithText = () =>
  <CreateButton />;

export const HideText = () =>
  <CreateButton hideText />;

export const Disabled = () =>
  <CreateButton disabled />;