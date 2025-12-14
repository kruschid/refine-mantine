import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Refine, type ResourceProps } from '@refinedev/core';
import dataProvider from "@refinedev/simple-rest";
import type { Preview } from "@storybook/react";
import { IconBrandMantine, IconCategory, IconColumns, IconDeviceDesktopFilled, IconDevices, IconReceiptEuroFilled, IconUsers } from "@tabler/icons-react";
import { BrowserRouter } from 'react-router';
import { authProvider } from "../src/providers/authProvider";
import { i18nProvider } from "../src/providers/i18nProvider";
import { notificationProvider } from "../src/providers/notificationProvider";
import { theme } from '../src/theme';

const resources: ResourceProps[] = [{
  name: "products",
  list: "/products",
  create: "/products/create",
  meta: {
    label: "Products",
    icon: <IconColumns />,
  },
}, {
  name: "laptops-desktops",
  list: "/products/category/1",
  meta: {
    label: "Laptops & Desktops",
    icon: <IconDeviceDesktopFilled />,
    parent: "products"
  },
},  {
  name: "smartphone-tablets",
  list: "/products/category/2",
  meta: {
    label: "Smartphone & Tablets",
    icon: <IconDevices />,
    parent: "products"
  },
}, {
  name: "categories",
  list: "/categories",
  meta: {
    label: "Categories",
    icon: <IconCategory />,
  }
}, {
  name: "invoices",
  list: "/invoices",
  meta: {
    label: "Invoices",
    icon: <IconReceiptEuroFilled />
  }
}, {
  name: "users",
  list: "/users",
  create: "/users/create",
  meta: {
    label: "Users",
    icon: <IconUsers />
  }
}];

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
    backgrounds: { disable: true },
  },
  decorators: [
    (Story, _ctx) => (
      <BrowserRouter>
        <MantineProvider theme={theme}>
          <Notifications position="top-right"/>
          <Refine
            authProvider={authProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={notificationProvider}
            resources={resources}
            i18nProvider={i18nProvider}
            options={{
              warnWhenUnsavedChanges: true,
              title: {
                icon: <IconBrandMantine size={32} />,
                text: "Refine-Mantine",
              },
            }}
          >
            <Story />
          </Refine>
        </MantineProvider>
      </BrowserRouter>
    )
  ], 
}

export default preview;
