import { ActionIcon, type ActionIconProps, Anchor, type AnchorProps, Button, type ButtonProps } from "@mantine/core";
import { useCreateButton } from "@refinedev/core";
import type { RefineCreateButtonProps } from "@refinedev/ui-types";
import { type IconProps, IconSquarePlus } from "@tabler/icons-react";
import type React from "react";

export type CreateButtonProps = RefineCreateButtonProps<{
  iconProps?: IconProps;
  anchorProps?: AnchorProps;
  actionIconProps?: ActionIconProps;
  buttonProps?: ButtonProps;
  disabled?: boolean;
}>;

export const CreateButton: React.FC<CreateButtonProps> = ({
  resource,
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
  const { to, label, title, disabled: disabledFromHook, hidden, LinkComponent } = useCreateButton(
    {
      resource,
      accessControl,
      meta,
    },
  );

  if (hidden) return null;

  const disabled = disabledFromProps || disabledFromHook;

  return (
    <Anchor
      // biome-ignore lint/suspicious/noExplicitAny: that's fine for now
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
          variant="filled"
          size="md"
          {...actionIconProps}
        >
          <IconSquarePlus size={18} {...iconProps} />
        </ActionIcon>
      ) : (
        <Button
          disabled={disabled}
          leftSection={<IconSquarePlus size={18} {...iconProps} />}
          title={title}
          variant="filled"
          {...buttonProps}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
