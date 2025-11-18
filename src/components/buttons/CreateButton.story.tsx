import { ActionIcon, Menu, Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { IconDots } from "@tabler/icons-react";
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

export const MenuItem = () =>
  <Menu shadow="md" width={200}>
    <Menu.Target>
      <ActionIcon variant="default"><IconDots size={16} /></ActionIcon>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Label>Create Button</Menu.Label>
      <CreateButton menuItem />
    </Menu.Dropdown>
  </Menu>;
