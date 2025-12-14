import { Group, Stack, type StackProps, ThemeIcon, type ThemeIconProps, Title } from "@mantine/core";
import { type TitleProps, useResourceParams, useTranslate, useUserFriendlyName } from "@refinedev/core";
import { IconGhost3Filled, type ReactNode } from "@tabler/icons-react";
import { CreateButton, type CreateButtonProps } from "../buttons/CreateButton";
import { ImportButton, type ImportButtonProps } from "../buttons/ImportButton";

interface EmptyProps {
  createButtonProps?: CreateButtonProps;
  icon?: ReactNode;
  themeIconProps?: ThemeIconProps;
  titleProps?: TitleProps;
  importButtonProps?: ImportButtonProps;
  stackProps?: StackProps;
}

export const Empty: React.FC<EmptyProps> = ({
  stackProps,
  icon,
  themeIconProps,
  titleProps,
  createButtonProps,
  importButtonProps,
}) => {
  const { resource, identifier } = useResourceParams();
  const getUserFriendlyName = useUserFriendlyName();
  const t = useTranslate();
  const resourcePlural = getUserFriendlyName(identifier ?? "resource", "plural");

  return (
    <Stack align="center" gap="md" {...stackProps}>
      <ThemeIcon variant="light" size="xl" {...themeIconProps}>
        {icon ?? resource?.meta?.icon ?? <IconGhost3Filled />}
      </ThemeIcon>
      <Title order={4} {...titleProps}>
        {t(`${identifier}.titles.list`, `No ${resourcePlural} Yet`)}
      </Title>
      <Group>
        <CreateButton {...createButtonProps} />
        {importButtonProps && (
          <ImportButton {...importButtonProps} />
        )}
      </Group>
    </Stack>
  );
}
