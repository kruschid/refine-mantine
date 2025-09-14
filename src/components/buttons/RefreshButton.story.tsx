import { Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { RefreshButton } from "./RefreshButton";

export default {
  title: 'Buttons/RefreshButton',
  component: RefreshButton,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof RefreshButton>;

export const WithText = () =>
  <RefreshButton />;

export const HideText = () =>
  <RefreshButton hideText />;

export const Disabled = () =>
  <RefreshButton disabled />;
