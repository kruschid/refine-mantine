import { ActionIcon, type ActionIconProps, Button, type ButtonProps, Menu, type MenuItemProps } from "@mantine/core";
import { useCreateButton } from "@refinedev/core";
import type { RefineCreateButtonProps } from "@refinedev/ui-types";
import { type IconProps, IconSquarePlus } from "@tabler/icons-react";
import type React from "react";
import { useCallback } from "react";

export type CreateButtonProps = RefineCreateButtonProps<{
  iconProps?: IconProps;
  actionIconProps?: ActionIconProps;
  buttonProps?: ButtonProps;
  disabled?: boolean;
  menuItem?: boolean;
  menuItemProps?: MenuItemProps;
}>;

export const CreateButton: React.FC<CreateButtonProps> = ({
  resource,
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
  const { to, label, title, disabled: disabledFromHook, hidden, LinkComponent } = useCreateButton(
    {
      resource,
      accessControl,
      meta,
    },
  );

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
  
  return hideText ? (
      <ActionIcon
        title={title}
        disabled={disabled}
        aria-label={label}
        variant="filled"
        size="md"
        {...actionProps}
        {...actionIconProps}
      >
        <IconSquarePlus size={18} {...iconProps} />
      </ActionIcon>
    ) : menuItem ?  (
      <Menu.Item
        disabled={disabled}
        leftSection={<IconSquarePlus size={14} {...iconProps} />}
        title={title}
        {...actionProps}
        {...menuItemProps}
      >
        {children ?? label}
      </Menu.Item>
    ) : (
      <Button
        disabled={disabled}
        leftSection={<IconSquarePlus size={18} {...iconProps} />}
        title={title}
        variant="filled"
        {...actionProps}
        {...buttonProps}
      >
        {children ?? label}
      </Button>
    );
};
