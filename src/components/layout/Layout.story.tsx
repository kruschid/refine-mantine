import { Image } from "@mantine/core";
import { Layout } from "./Layout";

export default {
  title: 'Components/Layout',
  component: Layout,
};

export const FullLayout = () =>
  <Layout>Hello World</Layout>;

export const HiddenNavbar = () =>
  <Layout hideNavbar>Hello World</Layout>;

export const WithLocaleChange = () =>
  <Layout
    locales={[{
      label: "English",
      lang: "en",
      icon: <Image h={18} src="https://flagsapi.com/US/flat/64.png" />,
    }, {
      label: "Deutsch",
      lang: "de",
      icon: <Image h={18} src="https://flagsapi.com/DE/flat/64.png" />
    }]}
  >
    Hello World
  </Layout>;
