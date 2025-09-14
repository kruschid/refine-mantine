import { Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { ShowButton } from "./ShowButton";

export default {
  title: 'Buttons/ShowButton',
  component: ShowButton,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof ShowButton>;

export const WithText = () =>
  <ShowButton />;

export const HideText = () =>
  <ShowButton hideText />;

export const Disabled = () =>
  <ShowButton disabled />;
