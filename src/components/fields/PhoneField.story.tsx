import { Stack } from "@mantine/core";
import { Meta } from "@storybook/react";
import { PhoneField } from "./PhoneField";

export default {
  title: 'Fields/PhoneField',
  component: PhoneField,
  decorators: (Story) => (
    <Stack h="100vh" align="center" justify="center">
      <Story />
    </Stack>
  ),
} satisfies Meta<typeof PhoneField>;

export const Default = () =>
  <PhoneField value="+05890000111">0-589-0000111</PhoneField>;

export const Colors = () =>
  <>
    <PhoneField
      value="+05890000111"
      anchorProps={{c: "indigo"}}
    />
    <PhoneField
      value="+05890000111"
      anchorProps={{c: "cyan"}}
    />
    <PhoneField
      value="+05890000111"
      anchorProps={{c: "teal"}}
    />
    <PhoneField
      value="+05890000111"
      anchorProps={{c: "lime"}}
    />
  </>;

export const Sizes = () =>
  <>
    <PhoneField
      value="+05890000111"
      textProps={{size: "xs"}}
    />
    <PhoneField
      value="+05890000111"
      textProps={{size: "sm"}}
    />
    <PhoneField
      value="+05890000111"
      textProps={{size: "md"}}
    />
    <PhoneField
      value="+05890000111"
      textProps={{size: "lg"}}
    />
    <PhoneField
      value="+05890000111"
      textProps={{size: "xl"}}
    />
  </>

export const WithTarget = () =>
  <PhoneField
    value="+05890000111"
    anchorProps={{target: "_blank"}}
  />;

export const Truncated = () =>
  <PhoneField
    value="+05890000111"
    anchorProps={{maw: 200}}
    textProps={{truncate: "end"}}
  />;

export const WithTitle = () =>
  <PhoneField
    value="+05890000111"
    anchorProps={{title: "refine-mantine"}}
  />;

export const Gradient = () =>
  <PhoneField
    value="+05890000111"
    anchorProps={{
      variant: "gradient",
      gradient: { from: 'pink', to: 'yellow' }
    }}
  />;

export const HiddenIcon = () =>
    <PhoneField
    value="+05890000111"
    iconProps={{
      display: "none",
    }}
  />;
