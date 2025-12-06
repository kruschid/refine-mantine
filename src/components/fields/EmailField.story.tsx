import { Stack } from "@mantine/core";
import { Meta } from "@storybook/react";
import { EmailField } from "./EmailField";

export default {
  title: 'Fields/EmailField',
  component: EmailField,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof EmailField>;

export const Default = () =>
  <EmailField value="test@example.com" />;

export const Colors = () =>
  <>
    <EmailField
      value="test@example.com"
      anchorProps={{c: "indigo"}}
    />
    <EmailField
      value="test@example.com"
      anchorProps={{c: "cyan"}}
    />
    <EmailField
      value="test@example.com"
      anchorProps={{c: "teal"}}
    />
    <EmailField
      value="test@example.com"
      anchorProps={{c: "lime"}}
    />
  </>;

export const Sizes = () =>
  <>
    <EmailField
      value="test@example.com"
      textProps={{size: "xs"}}
    />
    <EmailField
      value="test@example.com"
      textProps={{size: "sm"}}
    />
    <EmailField
      value="test@example.com"
      textProps={{size: "md"}}
    />
    <EmailField
      value="test@example.com"
      textProps={{size: "lg"}}
    />
    <EmailField
      value="test@example.com"
      textProps={{size: "xl"}}
    />
  </>;

export const Truncated = () =>
  <EmailField
    value="firstname.lastname@verylongdomain.tld"
    anchorProps={{maw: 200}}
    textProps={{truncate: "end"}}
  />;

export const Gradient = () =>
  <EmailField
    value="test@example.com"
    anchorProps={{
      variant: "gradient",
      gradient: { from: 'pink', to: 'yellow' }
    }}
  />;

export const HiddenIcon = () =>
  <EmailField
    value="test@example.com"
    iconProps={{
      display: "none",
    }}
  />;
