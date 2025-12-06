import { Stack } from "@mantine/core";
import { Meta } from "@storybook/react";
import { IconPhotoDown } from "@tabler/icons-react";
import { FileField } from "./FileField";

export default {
  title: 'Fields/FileField',
  component: FileField,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof FileField>;

export const Default = () =>
  <FileField value="https://github.com/kruschid/refine-mantine">refine-mantine</FileField>;

export const Colors = () =>
  <>
    <FileField
      value="https://github.com/kruschid/refine-mantine"
      anchorProps={{c: "indigo"}}
    />
    <FileField
      value="https://github.com/kruschid/refine-mantine"
      anchorProps={{c: "cyan"}}
    />
    <FileField
      value="https://github.com/kruschid/refine-mantine"
      anchorProps={{c: "teal"}}
    />
    <FileField
      value="https://github.com/kruschid/refine-mantine"
      anchorProps={{c: "lime"}}
    />
  </>;

export const Sizes = () =>
  <>
    <FileField
      value="https://github.com/kruschid/refine-mantine"
      textProps={{size: "xs"}}
    />
    <FileField
      value="https://github.com/kruschid/refine-mantine"
      textProps={{size: "sm"}}
    />
    <FileField
      value="https://github.com/kruschid/refine-mantine"
      textProps={{size: "md"}}
    />
    <FileField
      value="https://github.com/kruschid/refine-mantine"
      textProps={{size: "lg"}}
    />
    <FileField
      value="https://github.com/kruschid/refine-mantine"
      textProps={{size: "xl"}}
    />
  </>;

export const Truncated = () =>
  <FileField
    value="https://github.com/kruschid/refine-mantine"
    anchorProps={{maw: 200}}
    textProps={{truncate: "end"}}
  />;

export const Gradient = () =>
  <FileField
    value="https://github.com/kruschid/refine-mantine"
    anchorProps={{
      variant: "gradient",
      gradient: { from: 'pink', to: 'yellow' }
    }}
  />;

export const HiddenIcon = () =>
  <FileField
    value="https://github.com/kruschid/refine-mantine"
    iconProps={{
      display: "none",
    }}
  />;

export const CustomIcon = () =>
  <FileField
    value="https://github.com/kruschid/refine-mantine"
    icon={IconPhotoDown}
  />;
