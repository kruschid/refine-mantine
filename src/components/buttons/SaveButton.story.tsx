import { Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { SaveButton } from "./SaveButton";

export default {
  title: 'Buttons/SaveButton',
  component: SaveButton,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof SaveButton>;

export const WithText = () =>
  <SaveButton />;

export const HideText = () =>
  <SaveButton hideText />;

export const Disabled = () =>
  <SaveButton disabled />;
