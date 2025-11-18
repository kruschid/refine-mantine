import { ActionIcon, Menu, Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { IconDots } from "@tabler/icons-react";
import { ListButton } from "./ListButton";

export default {
  title: 'Buttons/ListButton',
  component: ListButton,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof ListButton>;

export const WithText = () =>
  <ListButton resource="product" />;

export const HideText = () =>
  <ListButton hideText />;

export const Disabled = () =>
  <ListButton
    resource="product"    
    disabled
  />;

export const MenuItem = () =>
  <Menu shadow="md" width={200}>
    <Menu.Target>
      <ActionIcon variant="default"><IconDots size={16} /></ActionIcon>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Label>List Button</Menu.Label>
      <ListButton menuItem>List</ListButton>
    </Menu.Dropdown>
  </Menu>;
