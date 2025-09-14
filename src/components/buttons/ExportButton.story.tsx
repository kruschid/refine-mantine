import { Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { ExportButton } from "./ExportButton";

export default {
  title: 'Buttons/ExportButton',
  component: ExportButton,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof ExportButton>;

export const WithText = () =>
  <ExportButton />;

export const HideText = () =>
  <ExportButton hideText />;

export const Disabled = () =>
  <ExportButton disabled />;

export const Loading = () =>
  <ExportButton loading />;

export const LoaderProps = () =>
  <ExportButton loading buttonProps={{loaderProps: {type: "dots"}}} />;
