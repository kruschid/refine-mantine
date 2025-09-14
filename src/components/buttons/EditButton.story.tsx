import { Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { EditButton } from "./EditButton";

export default {
  title: 'Buttons/EditButton',
  component: EditButton,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof EditButton>;

export const WithText = () =>
  <EditButton />;

export const HideText = () =>
  <EditButton hideText />;

export const Disabled = () =>
  <EditButton disabled />;