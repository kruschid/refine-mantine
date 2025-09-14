import { Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { DeleteButton } from "./DeleteButton";

export default {
  title: 'Buttons/DeleteButton',
  component: DeleteButton,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof DeleteButton>;

export const WithText = () =>
  <DeleteButton />;

export const HideText = () =>
  <DeleteButton hideText />;

export const Disabled = () =>
  <DeleteButton disabled />;
