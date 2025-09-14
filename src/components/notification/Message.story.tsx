import { Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { Message } from "./Message";

export default {
  title: 'Notifications/Message',
  component: Message,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof Message>;

export const SuccessMessage = () =>
  <Message
    message="Success"
    description="Resource was deleted"
    onUndo={console.log}
    undoableTimeout={4}
  />;

export const UndoLabel = () =>
  <Message
    message="Success"
    description="Resource was deleted"
    onUndo={console.log}
    undoLabel="Undo"
    undoableTimeout={4}
  />;
