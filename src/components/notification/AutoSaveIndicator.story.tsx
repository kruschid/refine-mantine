import { Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { AutoSaveIndicator } from "./AutoSaveIndicator";

export default {
  title: 'Notifications/AutoSaveIndicator',
  component: AutoSaveIndicator,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof AutoSaveIndicator>;

export const PendingStatus = () =>
  <AutoSaveIndicator status="pending" />;

export const ErrorStatus = () =>
  <AutoSaveIndicator status="error" />;

export const IdleStatus = () =>
  <AutoSaveIndicator status="idle" />;

export const SuccessStatus = () =>
  <AutoSaveIndicator status="success" />;

export const BadgeProps = () =>
  <AutoSaveIndicator
    status="success"
    iconSize={14}
    badgeProps={{
      variant: "filled",
      size: "lg",
      color: "green",
      styles: {
        label: {
          textTransform: "none",
        }
      }
    }}
  />;
