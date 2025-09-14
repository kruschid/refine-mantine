import {
  ActionIcon,
  type ActionIconProps,
  Anchor,
  type AnchorProps,
  Button,
  type ButtonProps,
} from "@mantine/core";
import { useCloneButton } from "@refinedev/core";
import type { RefineCloneButtonProps } from "@refinedev/ui-types";
import { type IconProps, IconSquarePlus } from "@tabler/icons-react";

export type CloneButtonProps = RefineCloneButtonProps<{
  iconProps?: IconProps;
  anchorProps?: AnchorProps;
  actionIconProps?: ActionIconProps;
  buttonProps?: ButtonProps;
  disabled?: boolean;
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
  anchorProps,
  buttonProps,
  disabled: disabledFromProps,
  onClick,
}) => {
  const { to, label, title, hidden, disabled: disabledFromHook, LinkComponent } = useCloneButton({
    resource,
    id: recordItemId,
    accessControl,
    meta,
  });

  if (hidden) return null;

  const disabled = disabledFromProps || disabledFromHook;

  return (
    <Anchor
      // biome-ignore lint/suspicious/noExplicitAny: refines types messed up
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
          aria-label={label}
          {...actionIconProps}
        >
          <IconSquarePlus size={18} {...iconProps} />
        </ActionIcon>
      ) : (
        <Button
          variant="default"
          disabled={disabled}
          leftSection={<IconSquarePlus size={18} {...iconProps} />}
          title={title}
          {...buttonProps}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
