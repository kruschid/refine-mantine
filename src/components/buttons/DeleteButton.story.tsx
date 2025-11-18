import { ActionIcon, Menu, Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { IconDots } from "@tabler/icons-react";
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

export const MenuItem = () =>
  <Menu shadow="md" width={200}>
    <Menu.Target>
      <ActionIcon variant="default"><IconDots size={16} /></ActionIcon>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Label>Delete Button</Menu.Label>
      <DeleteButton menuItem />
    </Menu.Dropdown>
  </Menu>;
