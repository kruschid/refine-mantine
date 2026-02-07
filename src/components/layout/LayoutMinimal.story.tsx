import { Image } from "@mantine/core";
import type { Meta } from "@storybook/react";
import { LayoutMinimal } from "./LayoutMinimal";

export default {
  title: "Components/LayoutMinimal",
  component: LayoutMinimal,
} satisfies Meta<typeof LayoutMinimal>;

export const FullLayout = () => <LayoutMinimal>Hello World</LayoutMinimal>;

export const WithLocaleChange = () => (
  <LayoutMinimal
    locales={[
      {
        label: "English",
        lang: "en",
        icon: <Image h={18} src="https://flagsapi.com/US/flat/64.png" />,
      },
      {
        label: "Deutsch",
        lang: "de",
        icon: <Image h={18} src="https://flagsapi.com/DE/flat/64.png" />,
      },
    ]}
  >
    Hello World
  </LayoutMinimal>
);

export const WithFooter = () => (
  <LayoutMinimal
    footer={
      <div style={{ padding: 12, textAlign: "center" }}>
        Footer content
      </div>
    }
    footerProps={{ height: 48, withBorder: true }}
  >
    Hello World
  </LayoutMinimal>
);
