import { ActionIcon, type ActionIconProps, Anchor, Button, type ButtonProps } from "@mantine/core";
import { useShowButton } from "@refinedev/core";
import type { RefineShowButtonProps } from "@refinedev/ui-types";
import { IconEye, type IconProps } from "@tabler/icons-react";
import type React from "react";

export type ShowButtonProps = RefineShowButtonProps<{
  iconProps?: IconProps;
  actionIconProps?: ActionIconProps;
  buttonProps?: ButtonProps;
  disabled?: boolean;
}>;

export const ShowButton: React.FC<ShowButtonProps> = ({
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
  onClick,
}) => {
  const {
    to,
    label,
    title,
    disabled: disabledFromHook,
    hidden,
    LinkComponent,
  } = useShowButton({
    resource,
    id: recordItemId,
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
    >
      {hideText ? (
        <ActionIcon
          variant="default"
          disabled={disabled}
          title={title}
          {...actionIconProps}
        >
          <IconEye size={18} {...iconProps} />
        </ActionIcon>
      ) : (
        <Button
          variant="default"
          disabled={disabled}
          leftSection={<IconEye size={18} {...iconProps} />}
          title={title}
          {...buttonProps}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
