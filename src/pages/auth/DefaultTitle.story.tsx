import { Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { DefaultTitle } from "./DefaultTitle";

export default {
  title: "Auth/DefaultTitle",
  component: DefaultTitle,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof DefaultTitle>;

export const Basic = () => <DefaultTitle />;
