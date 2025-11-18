import { ActionIcon, Menu, Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { IconDots } from "@tabler/icons-react";
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

export const MenuItem = () =>
  <Menu shadow="md" width={200}>
    <Menu.Target>
      <ActionIcon variant="default"><IconDots size={16} /></ActionIcon>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Label>Clone Button</Menu.Label>
      <CloneButton menuItem />
    </Menu.Dropdown>
  </Menu>;
