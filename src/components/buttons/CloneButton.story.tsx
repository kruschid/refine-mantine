import { Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { CloneButton } from "./CloneButton";

export default {
  title: 'Buttons/CloneButton',
  component: CloneButton,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof CloneButton>;

export const WithText = () =>
  <CloneButton />;

export const HideText = () =>
  <CloneButton hideText />;

export const Disabled = () =>
  <CloneButton disabled />;
