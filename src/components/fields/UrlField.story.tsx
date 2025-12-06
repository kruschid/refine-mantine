import { Stack } from "@mantine/core";
import { Meta } from "@storybook/react";
import { UrlField } from "./UrlField";

export default {
  title: 'Fields/UrlField',
  component: UrlField,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof UrlField>;

export const Default = () =>
  <UrlField value="https://github.com/kruschid/refine-mantine">refine-mantine</UrlField>;

export const Colors = () =>
  <>
    <UrlField
      value="https://github.com/kruschid/refine-mantine"
      anchorProps={{c: "indigo"}}
    />
    <UrlField
      value="https://github.com/kruschid/refine-mantine"
      anchorProps={{c: "cyan"}}
    />
    <UrlField
      value="https://github.com/kruschid/refine-mantine"
      anchorProps={{c: "teal"}}
    />
    <UrlField
      value="https://github.com/kruschid/refine-mantine"
      anchorProps={{c: "lime"}}
    />
  </>;

export const Sizes = () =>
  <>
    <UrlField
      value="https://github.com/kruschid/refine-mantine"
      textProps={{size: "xs"}}
    />
    <UrlField
      value="https://github.com/kruschid/refine-mantine"
      textProps={{size: "sm"}}
    />
    <UrlField
      value="https://github.com/kruschid/refine-mantine"
      textProps={{size: "md"}}
    />
    <UrlField
      value="https://github.com/kruschid/refine-mantine"
      textProps={{size: "lg"}}
    />
    <UrlField
      value="https://github.com/kruschid/refine-mantine"
      textProps={{size: "xl"}}
    />
  </>

export const WithTarget = () =>
  <UrlField
    value="https://github.com/kruschid/refine-mantine"
    anchorProps={{target: "_blank"}}
  />;

export const Truncated = () =>
  <UrlField
    value="https://github.com/kruschid/refine-mantine"
    anchorProps={{maw: 200}}
    textProps={{truncate: "end"}}
  />;

export const WithTitle = () =>
  <UrlField
    value="https://github.com/kruschid/refine-mantine"
    anchorProps={{title: "refine-mantine"}}
  />;

export const Gradient = () =>
  <UrlField
    value="https://github.com/kruschid/refine-mantine"
    anchorProps={{
      variant: "gradient",
      gradient: { from: 'pink', to: 'yellow' }
    }}
  />;

export const HiddenIcon = () =>
    <UrlField
    value="https://github.com/kruschid/refine-mantine"
    iconProps={{
      display: "none",
    }}
  />;
