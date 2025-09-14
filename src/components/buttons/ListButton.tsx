import {
  ActionIcon,
  type ActionIconProps,
  Anchor,
  type AnchorProps,
  Button,
  type ButtonProps,
} from "@mantine/core";
import { useListButton } from "@refinedev/core";
import type { RefineListButtonProps } from "@refinedev/ui-types";
import { IconList, type IconProps } from "@tabler/icons-react";
import type React from "react";

export type ListButtonProps = RefineListButtonProps<{
  iconProps?: IconProps;
  anchorProps?: AnchorProps;
  actionIconProps?: ActionIconProps;
  buttonProps?: ButtonProps;
  disabled?: boolean;
}>;

export const ListButton: React.FC<ListButtonProps> = ({
  resource,
  hideText = false,
  accessControl,
  meta,
  children,
  iconProps,
  actionIconProps,
  buttonProps,
  anchorProps,
  disabled: disabledFromProps,
  onClick,
}) => {
  const {
    to,
    label,
    title,
    disabled: disabledFromHook,
    hidden,
    LinkComponent,
  } = useListButton({
    resource,
    accessControl,
    meta,
  });

  if (hidden) return null;

  const disabled = disabledFromProps || disabledFromHook;

  return (
    <Anchor
      // biome-ignore lint/suspicious/noExplicitAny: that's fine
      component={LinkComponent as any}
      to={to}
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      {...anchorProps}
    >
      {hideText ? (
        <ActionIcon
          variant="default"
          disabled={disabled}
          title={title}
          {...actionIconProps}
        >
          <IconList size={18} {...iconProps} />
        </ActionIcon>
      ) : (
        <Button
          variant="default"
          disabled={disabled}
          leftSection={<IconList size={18} {...iconProps} />}
          title={title}
          {...buttonProps}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
