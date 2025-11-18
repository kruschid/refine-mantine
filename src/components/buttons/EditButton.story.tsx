import { ActionIcon, Menu, Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { IconDots } from "@tabler/icons-react";
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

export const MenuItem = () =>
  <Menu shadow="md" width={200}>
    <Menu.Target>
      <ActionIcon variant="default"><IconDots size={16} /></ActionIcon>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Label>Edit Button</Menu.Label>
      <EditButton menuItem />
    </Menu.Dropdown>
  </Menu>;
