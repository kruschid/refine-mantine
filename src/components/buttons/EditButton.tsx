import {
  ActionIcon,
  type ActionIconProps,
  Anchor,
  type AnchorProps,
  Button,
  type ButtonProps,
} from "@mantine/core";
import { useEditButton } from "@refinedev/core";
import type { RefineEditButtonProps } from "@refinedev/ui-types";
import { IconPencil, type IconProps } from "@tabler/icons-react";
import type React from "react";

export type EditButtonProps = RefineEditButtonProps<{
  iconProps?: IconProps;
  anchorProps?: AnchorProps;
  actionIconProps?: ActionIconProps;
  buttonProps?: ButtonProps;
  disabled?: boolean;
}>;

export const EditButton: React.FC<EditButtonProps> = ({
  resource,
  recordItemId,
  hideText = false,
  accessControl,
  meta,
  children,
  iconProps,
  anchorProps,
  actionIconProps,
  buttonProps,
  disabled: disabledFromProps,
  onClick,
}) => {
  const { to, label, title, disabled: disabledFromHook, hidden, LinkComponent } = useEditButton({
    resource,
    id: recordItemId,
    accessControl,
    meta,
  });

  if (hidden) return null;

  const disabled = disabledFromProps || disabledFromHook;

  return (
    <Anchor
      // biome-ignore lint/suspicious/noExplicitAny: refine tzpes are messed up
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
          title={title}
          disabled={disabled}
          aria-label={label}
          variant="default"
          {...actionIconProps}
        >
          <IconPencil size={18} {...iconProps} />
        </ActionIcon>
      ) : (
        <Button
          variant="default"
          disabled={disabled}
          leftSection={<IconPencil size={18} {...iconProps} />}
          title={title}
          {...buttonProps}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
