import {
  ActionIcon,
  type ActionIconProps,
  Button,
  type ButtonProps,
  Menu,
  type MenuItemProps
} from "@mantine/core";
import { useCloneButton } from "@refinedev/core";
import type { RefineCloneButtonProps } from "@refinedev/ui-types";
import { IconLibraryPlus, type IconProps } from "@tabler/icons-react";
import { useCallback } from "react";

export type CloneButtonProps = RefineCloneButtonProps<{
  iconProps?: IconProps;
  actionIconProps?: ActionIconProps;
  buttonProps?: ButtonProps;
  disabled?: boolean;
  menuItem?: boolean;
  menuItemProps?: MenuItemProps;
}>;

export const CloneButton: React.FC<CloneButtonProps> = ({
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
  const { to, label, title, hidden, disabled: disabledFromHook, LinkComponent } = useCloneButton({
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

  return hideText ? (
      <ActionIcon
        variant="default"
        disabled={disabled}
        title={title}
        aria-label={label}
        {...actionProps}
        {...actionIconProps}
      >
        <IconLibraryPlus size={18} {...iconProps} />
      </ActionIcon>
    ) : menuItem ?  (
      <Menu.Item
        disabled={disabled}
        leftSection={<IconLibraryPlus size={14} {...iconProps} />}
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
        leftSection={<IconLibraryPlus size={18} {...iconProps} />}
        title={title}
        {...actionProps}
        {...buttonProps}
      >
        {children ?? label}
      </Button>
    );
};
