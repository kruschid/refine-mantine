import {
  ActionIcon,
  type ActionIconProps,
  Button,
  type ButtonProps,
  Group,
  Menu,
  type MenuItemProps,
  Popover,
  type PopoverProps,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteButton } from "@refinedev/core";
import type { RefineDeleteButtonProps } from "@refinedev/ui-types";
import { type IconProps, IconTrash } from "@tabler/icons-react";
import type React from "react";

export type DeleteButtonProps = RefineDeleteButtonProps<{
  iconProps?: IconProps;
  popoverProps?: PopoverProps;
  actionIconProps?: ActionIconProps;
  buttonProps?: ButtonProps;
  disabled?: boolean;
  menuItem?: boolean;
  menuItemProps?: MenuItemProps;
}>;

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  resource,
  recordItemId,
  mutationMode,
  invalidates,
  children,
  successNotification,
  errorNotification,
  hideText = false,
  accessControl,
  meta,
  dataProviderName,
  confirmTitle,
  confirmOkText,
  confirmCancelText,
  iconProps,
  popoverProps,
  actionIconProps,
  buttonProps,
  disabled: disabledFromProps,
  menuItem,
  menuItemProps,
  onSuccess,
}) => {
  const {
    title,
    label,
    hidden,
    disabled: disabledFromHook,
    loading,
    confirmTitle: defaultConfirmTitle,
    confirmOkLabel: defaultConfirmOkLabel,
    cancelLabel: defaultCancelLabel,
    onConfirm,
  } = useDeleteButton({
    resource,
    id: recordItemId,
    dataProviderName,
    errorNotification,
    successNotification,
    invalidates,
    mutationMode,
    accessControl,
    meta,
    onSuccess,
  });

  const [opened, handlers] = useDisclosure(false);

  if (hidden) return null;

  const disabled = disabledFromProps || disabledFromHook;

  return (
    <Popover
      opened={opened}
      onChange={handlers.toggle}
      withArrow
      withinPortal
      disabled={disabled}
      {...popoverProps}
    >
      <Popover.Target>
        {hideText ? (
          <ActionIcon
            color="red"
            variant="outline"
            onClick={handlers.toggle}
            disabled={disabled}
            loading={loading}
            {...actionIconProps}
          >
            <IconTrash size={18} {...iconProps} />
          </ActionIcon>
        ) :  menuItem ?  (
          <Menu.Item
            variant="default"
            onClick={handlers.toggle}
            disabled={disabled}
            leftSection={<IconTrash size={18} {...iconProps} />}
            title={title}
            closeMenuOnClick={false}
            {...menuItemProps}
          >
            {children ?? label}
          </Menu.Item>
        ) : (
          <Button
            color="red"
            variant="outline"
            onClick={handlers.toggle}
            disabled={disabled}
            loading={loading}
            title={title}
            leftSection={<IconTrash size={18} {...iconProps} />}
            {...buttonProps}
          >
            {children ?? label}
          </Button>
        )}
      </Popover.Target>
      <Popover.Dropdown py="xs">
        <Text>{confirmTitle ?? defaultConfirmTitle}</Text>
        <Group mt="xs">
          <Button onClick={handlers.close} variant="default" size="xs">
            {confirmCancelText ?? defaultCancelLabel}
          </Button>
          <Button
            color="red"
            onClick={() => {
              onConfirm();
              handlers.close();
            }}
            autoFocus
            size="xs"
          >
            {confirmOkText ?? defaultConfirmOkLabel}
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
