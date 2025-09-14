import { Stack } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { ImportButton } from "./ImportButton";

export default {
  title: 'Buttons/ImportButton',
  component: ImportButton,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof ImportButton>;

const inputProps = {
  accept: "image/png,image/jpeg",
  onChange: console.log,
  type: "file",
} as const;

export const WithText = () =>
  <ImportButton inputProps={inputProps} />;

export const HideText = () =>
  <ImportButton hideText inputProps={inputProps} />;

export const Disabled = () =>
  <ImportButton
    inputProps={inputProps}
    disabled
  />;

export const Loading = () =>
  <ImportButton
    inputProps={inputProps}
    loading
  />;

export const LoaderProps = () =>
  <ImportButton
    inputProps={inputProps}
    loading
    buttonProps={{loaderProps: {type: "dots"}}}
  />;
