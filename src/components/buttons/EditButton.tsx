import {
  ActionIcon,
  type ActionIconProps,
  Button,
  type ButtonProps,
  Menu,
  type MenuItemProps
} from "@mantine/core";
import { useEditButton } from "@refinedev/core";
import type { RefineEditButtonProps } from "@refinedev/ui-types";
import { IconPencil, type IconProps } from "@tabler/icons-react";
import type React from "react";
import { useCallback } from "react";

export type EditButtonProps = RefineEditButtonProps<{
  iconProps?: IconProps;
  actionIconProps?: ActionIconProps;
  buttonProps?: ButtonProps;
  disabled?: boolean;
  menuItem?: boolean;
  menuItemProps?: MenuItemProps;
}>;

export const EditButton: React.FC<EditButtonProps> = ({
  resource,
  recordItemId,
  hideText = false,
  accessControl,
  meta,
  children,
  iconProps,
  actionIconProps,
  buttonProps,
  disabled: disabledFromProps,
  menuItem,
  menuItemProps,
  onClick,
}) => {
  const { to, label, title, disabled: disabledFromHook, hidden, LinkComponent } = useEditButton({
    resource,
    id: recordItemId,
    accessControl,
    meta,
  });

  const disabled = disabledFromProps || disabledFromHook;

  const handleClick = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  }, [disabled, onClick]);

  const actionProps = {
    // biome-ignore lint/suspicious/noExplicitAny: that's fine
    component: LinkComponent as any,
    onClick: handleClick,
    to,
  }

  if (hidden) return null;

  return (
      hideText ? (
        <ActionIcon
          title={title}
          disabled={disabled}
          aria-label={label}
          variant="default"
          {...actionProps}
          {...actionIconProps}
        >
          <IconPencil size={18} {...iconProps} />
        </ActionIcon>
      ) :  menuItem ?  (
        <Menu.Item
          variant="default"
          disabled={disabled}
          leftSection={<IconPencil size={18} {...iconProps} />}
          title={title}
          {...actionProps}
          {...menuItemProps}
        >
          {children ?? label}
        </Menu.Item>
      ) : (
        <Button
          variant="default"
          disabled={disabled}
          leftSection={<IconPencil size={18} {...iconProps} />}
          title={title}
          {...actionProps}
          {...buttonProps}
        >
          {children ?? label}
        </Button>
      )
  );
};
