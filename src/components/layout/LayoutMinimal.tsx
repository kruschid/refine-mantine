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
  Stack,
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
  const languageLabel = translate("layout.navbar.languageLabel", "Language");
  const colorSchemeLabel = computedColorScheme === 'dark'
    ? translate("layout.header.lightMode", 'Light mode')
    : translate("layout.header.darkMode", 'Dark mode');

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <AppShell
      header={{
        height: { base: 60, sm: 0 },
      }}
      navbar={{
        width: { base: 260, sm: 80 },
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
      <AppShell.Header p="md" {...p.headerProps} hiddenFrom="sm">
        {p.renderHeader ? (
          p.renderHeader(toggle)
        ) : (
          <Group justify="space-between">
            <Group>
              <Burger opened={opened} onClick={toggle} size="sm" hidden={p.hideNavbar} />
              <Anchor
                component={Link as React.FC<{ to: string, children: ReactNode }>}
                to="/"
                style={{all: "unset"}}
              >
                <Group>
                  {defaultIcon}
                  {defaultText ? <Text>{defaultText}</Text> : null}
                </Group>
              </Anchor>
            </Group>
          </Group>
        )}
      </AppShell.Header>

      <AppShell.Navbar {...p.navbarProps}>
        <AppShell.Section visibleFrom="sm" p="md">
          <Stack align="center" gap="xs">
            <Tooltip label={defaultText ?? translate("layout.navbar.homeLabel", "Home")} position="right" transitionProps={{ duration: 0 }}>
              <Anchor
                component={Link as React.FC<{ to: string, children: ReactNode }>}
                to="/"
                style={{all: "unset"}}
              >
                <Stack align="center" gap={2}>
                  {defaultIcon}
                </Stack>
              </Anchor>
            </Tooltip>
          </Stack>
        </AppShell.Section>

        <AppShell.Section
          component={ScrollArea}
          grow
          mt="xs"
          {...p.navbarMenuProps}
          visibleFrom="sm"
        >
          {p.renderMenu ? (
            p.renderMenu(menu)
          ) : (
            <Stack align="center" gap={0}>
              {menu.menuItems.map((item) => (
                <MenuItemIcon
                  item={item}
                  key={item.key}
                  selectedKey={menu.selectedKey}
                  onClick={close}
                />
              ))}
            </Stack>
          )}
        </AppShell.Section>

        <AppShell.Section
          component={ScrollArea}
          grow
          mt="xs"
          {...p.navbarMenuProps}
          hiddenFrom="sm"
        >
          {p.renderMenu ? (
            p.renderMenu(menu)
          ) : (
            <Stack gap="xs">
              {menu.menuItems.map((item) => (
                <MenuItemFull
                  item={item}
                  key={item.key}
                  selectedKey={menu.selectedKey}
                  onClick={close}
                />
              ))}
            </Stack>
          )}
        </AppShell.Section>

        <AppShell.Section {...p.navbarFooterProps} visibleFrom="sm">
          {p.renderIdentity ? (
            p.renderIdentity(identity, handleLogout)
          ) : (
            <Stack align="center" gap="xs">
              {p.locales && (
                <Locales locales={p.locales} variant="icon" label={languageLabel} />
              )}
              <Tooltip label={colorSchemeLabel} position="right" transitionProps={{ duration: 0 }}>
                <ActionIcon
                  onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                  aria-label={translate("layout.header.toggleColorScheme", "Toggle color scheme")}
                  variant="subtle"
                  size="xl"
                >
                  {computedColorScheme === "light"
                    ? <IconSun stroke={1.5} size={22} />
                    : <IconMoon stroke={1.5} size={22} />}
                </ActionIcon>
              </Tooltip>
              <Tooltip label={translate("layout.navbar.signOutLabel", "Sign out")} position="right" transitionProps={{ duration: 0 }}>
                <ActionIcon
                  onClick={handleLogout}
                  aria-label={translate("layout.navbar.signOutLabel", "Sign out")}
                  variant="subtle"
                  size="xl"
                >
                  <IconLogout size={20} />
                </ActionIcon>
              </Tooltip>
            </Stack>
          )}
        </AppShell.Section>

        <AppShell.Section {...p.navbarFooterProps} hiddenFrom="sm">
          <Stack gap="xs">
            {p.locales && (
              <Locales locales={p.locales} variant="full" label={languageLabel} />
            )}
            <NavLink
              onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
              leftSection={computedColorScheme === "light"
                ? <IconSun stroke={1.5} size={18} />
                : <IconMoon stroke={1.5} size={18} />}
              label={colorSchemeLabel}
              variant="subtle"
            />
            {p.renderIdentity ? (
              p.renderIdentity(identity, handleLogout)
            ) : (
              <NavLink
                onClick={handleLogout}
                leftSection={identity?.avatar ? <Avatar src={identity.avatar} /> : <IconLogout size={18} />}
                label={translate("layout.navbar.signOutLabel", "Sign out")}
                description={
                  identity?.email
                    ? translate("layout.navbar.signOutDescription", { email: identity.email }, `Signed in as ${identity.email}`)
                    : undefined
                }
                variant="filled"
                active
              />
            )}
          </Stack>
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

const MenuItemIcon = (p: {
  item: TreeMenuItem;
  selectedKey?: string;
  onClick: () => void;
}) => {
  const { listUrl } = useNavigation();
  const isSelected = p.item.key === p.selectedKey;
  const label = p.item.meta?.label ?? p.item.label ?? p.item.name;

  return (
    <CanAccess
      key={p.item.key}
      resource={p.item.name}
      action="list"
      params={{
        resource: p.item,
      }}
    >
      <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
        <ActionIcon
          key={p.item.key}
          component={Link as React.FC<{ to: string, onClick: () => void }>}
          to={listUrl(p.item.name)}
          variant={isSelected ? "filled" : "subtle"}
          size="xl"
          mb="xs"
          bd={0}
          onClick={p.onClick}
        >
          {p.item.meta?.icon ?? <IconList size={20} />}
        </ActionIcon>
      </Tooltip>
    </CanAccess>
  );
};

const MenuItemFull = (p: {
  item: TreeMenuItem;
  selectedKey?: string;
  onClick: () => void;
}) => {
  const { listUrl } = useNavigation();
  const isSelected = p.item.key === p.selectedKey;
  const label = p.item.meta?.label ?? p.item.label ?? p.item.name;

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
        label={label}
        leftSection={p.item.meta?.icon ?? <IconList size={18} />}
        active={isSelected}
        component={Link as React.FC<{ to: string, onClick: () => void }>}
        to={listUrl(p.item.name)}
        onClick={p.onClick}
      />
    </CanAccess>
  );
};

const Locales = (p: {
  locales: LayoutLocale[];
  variant: "icon" | "full";
  label: string;
}) => {
  const { changeLocale, getLocale } = useTranslation();
  const locale = getLocale();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {p.variant === "icon" ? (
          <Tooltip label={p.label} position="right" transitionProps={{ duration: 0 }}>
            <ActionIcon aria-label={p.label} variant="subtle" size="xl">
              <IconLanguage />
            </ActionIcon>
          </Tooltip>
        ) : (
          <NavLink
            label={p.label}
            leftSection={<IconLanguage size={18} />}
            component="button"
          />
        )}
      </Menu.Target>
      <Menu.Dropdown>
        {p.locales.map(({label, lang, icon}) => (
          <Menu.Item
            key={lang}
            leftSection={icon}
            onClick={() => changeLocale(lang)}
            rightSection={lang === locale ? <IconCheck size={14} /> : undefined}
          >
            {label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
