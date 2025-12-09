import {
  ActionIcon,
  Anchor,
  AppShell,
  type AppShellFooterProps,
  type AppShellHeaderProps,
  type AppShellMainProps,
  type AppShellNavbarConfiguration,
  type AppShellNavbarProps,
  type AppShellProps,
  type AppShellSectionProps,
  Avatar,
  Burger,
  Group,
  Menu,
  NavLink,
  ScrollArea,
  Text,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  type BaseRecord,
  CanAccess,
  Link,
  type TreeMenuItem,
  useGetIdentity,
  useLogout,
  useMenu,
  useNavigation,
  useRefineOptions,
  useTranslate,
  useTranslation,
} from "@refinedev/core";
import { IconCheck, IconLanguage, IconList, IconLogout, IconMoon, IconSun } from "@tabler/icons-react";
import { type ReactNode, useCallback } from "react";

interface LayoutProps {
  children: ReactNode;
  shellProps?: AppShellProps;
  headerProps?: AppShellHeaderProps;
  navbarProps?: AppShellNavbarProps;
  navbarConfiguration?: Partial<AppShellNavbarConfiguration>; 
  navbarMenuProps?: AppShellSectionProps;
  navbarFooterProps?: AppShellSectionProps;
  mainProps?: AppShellMainProps;
  hideNavbar?: boolean;
  footer?: ReactNode;
  footerProps?: AppShellFooterProps;
  locales?: LayoutLocale[];
  renderHeader?: (toggle: ()=> void) => ReactNode;
  renderMenu?: (params: ReturnType<typeof useMenu>) => ReactNode;
  renderIdentity?: <T extends BaseRecord>(identity: T, logout: () => void) => ReactNode;
}

export interface LayoutLocale {
  lang: string;
  label: string;
  icon?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = (p) => {
  const [opened, { toggle, close }] = useDisclosure();
  const { title: { icon: defaultIcon, text: defaultText } = {} } =
    useRefineOptions();
  const { data: identity } = useGetIdentity();
  const menu = useMenu();
  const { mutate: logout } = useLogout();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const translate = useTranslate();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          mobile: !opened || p.hideNavbar,
          desktop: p.hideNavbar,
        },
        ...p.navbarConfiguration,
      }}
      padding="md"
      {...p.shellProps}
    >
      <AppShell.Header p="md" {...p.headerProps}>
        {p.renderHeader ? (
          p.renderHeader(toggle)
        ) : (
          <Group justify="space-between">
            <Group>
              <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" hidden={p.hideNavbar} />
              <Anchor
                component={Link as React.FC<{ to: string, children: ReactNode }>}
                to="/"
                style={{all: "unset"}}
              >
                <Group>
                  {defaultIcon}
                  <Text>{defaultText}</Text>
                </Group>
              </Anchor>
            </Group>
            <Group>
              {p.locales && (
                <Locales locales={p.locales} />
              )}
              <Tooltip label={
                computedColorScheme === 'dark'
                ? translate("layout.header.lightMode", 'Light mode')
                : translate("layout.header.darkMode", 'Dark mode')
              }>
                <ActionIcon
                  onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                  aria-label={translate("layout.header.toggleColorScheme", "Toggle color scheme")}
                  variant="default"
                >
                  {computedColorScheme === "light"
                    ? <IconSun stroke={1.5} size={22} />
                    : <IconMoon stroke={1.5} size={22} />}
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        )}
      </AppShell.Header>

      <AppShell.Navbar {...p.navbarProps}>
        <AppShell.Section
          component={ScrollArea}
          grow
          mt="xs"
          {...p.navbarMenuProps}
        >
          {p.renderMenu ? (
            p.renderMenu(menu)
          ) : (
            menu.menuItems.map((item) => (
              <MenuItem
                item={item}
                defaultOpenKeys={menu.defaultOpenKeys}
                key={item.key}
                selectedKey={menu.selectedKey}
                onClickLeaf={close}
              />
            ))
          )}
        </AppShell.Section>
        <AppShell.Section {...p.navbarFooterProps}>
          {p.renderIdentity ? (
            p.renderIdentity(identity, handleLogout)
          ) : (
            <NavLink
              onClick={handleLogout}
              leftSection={identity?.avatar ? <Avatar src={identity.avatar} /> : undefined}
              rightSection={<IconLogout />}
              label={translate("layout.navbar.signOutLabel", "Sign out")}
              variant="filled"
              description={
                identity?.email
                  ? translate("layout.navbar.signOutDescription", { email: identity.email }, `Signed in as ${identity.email}`)
                  : undefined
              }
              active
            />
          )}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main {...p.mainProps}>
        {p.children}
      </AppShell.Main>
      
      <AppShell.Footer {...p.footerProps}>
        {p.footer}
      </AppShell.Footer>
    </AppShell>
  );
};

const MenuItem = (p: {
  item: TreeMenuItem;
  selectedKey?: string;
  defaultOpenKeys: string[];
  onClickLeaf: () => void;
}) => {
  const { listUrl } = useNavigation();
  const isSelected = p.item.key === p.selectedKey;

  return (
    <CanAccess
      key={p.item.key}
      resource={p.item.name}
      action="list"
      params={{
        resource: p.item,
      }}
    >
      <NavLink
        key={p.item.key}
        label={p.item.meta?.label}
        leftSection={p.item.meta?.icon ?? <IconList size={20} />}
        active={isSelected}
        defaultOpened={p.defaultOpenKeys.includes(p.item.key ?? "")}
        component={Link as React.FC<{ to: string }>}
        to={listUrl(p.item.name)}
        onClick={p.item.children.length > 0 ? undefined : p.onClickLeaf}
      >
        {p.item.children.length > 0 ? (
          p.item.children.map(child =>
            <MenuItem
              key={child.key}
              item={child}
              defaultOpenKeys={p.defaultOpenKeys}
              selectedKey={p.selectedKey}
              onClickLeaf={p.onClickLeaf}
            />
          )
        ) : null}
      </NavLink>
    </CanAccess>
  );
};

const Locales = (p: {
  locales: LayoutLocale[];
}) => {
  const { changeLocale, getLocale } = useTranslation();
  const locale = getLocale();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon>
          <IconLanguage />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {p.locales.map(({label, lang, icon}) => (
          <>
            <Menu.Item
              leftSection={icon}
              onClick={() => changeLocale(lang)}
              rightSection={lang === locale ? <IconCheck size={14} /> : undefined}
            >
              {label}
            </Menu.Item>
          </>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
