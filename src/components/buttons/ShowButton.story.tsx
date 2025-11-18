import { ActionIcon, Menu, Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { IconDots } from "@tabler/icons-react";
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

export const MenuItem = () =>
  <Menu shadow="md" width={200}>
    <Menu.Target>
      <ActionIcon variant="default"><IconDots size={16} /></ActionIcon>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Label>Show Button</Menu.Label>
      <ShowButton menuItem />
    </Menu.Dropdown>
  </Menu>;
