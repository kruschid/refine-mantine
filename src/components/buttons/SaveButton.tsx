import {
  ActionIcon,
  type ActionIconProps,
  Button,
  type ButtonProps,
} from "@mantine/core";
import { useSaveButton } from "@refinedev/core";
import type { RefineSaveButtonProps } from "@refinedev/ui-types";
import { IconDeviceFloppy, type IconProps } from "@tabler/icons-react";
import type React from "react";

export type SaveButtonProps = RefineSaveButtonProps<{
  iconProps?: IconProps;
  actionIconProps?: ActionIconProps;
  buttonProps?: ButtonProps;
  disabled?: boolean;
}>;

export const SaveButton: React.FC<SaveButtonProps> = ({
  hideText = false,
  children,
  iconProps,
  actionIconProps,
  buttonProps,
  disabled,
  onClick
}) => {
  const { label } = useSaveButton();

  return hideText ? (
    <ActionIcon
      variant="filled"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      {...actionIconProps}
    >
      <IconDeviceFloppy size={18} {...iconProps} />
    </ActionIcon>
  ) : (
    <Button
      variant="filled"
      leftSection={<IconDeviceFloppy size={18} {...iconProps} />}
      onClick={onClick}
      disabled={disabled}
      {...buttonProps}
    >
      {children ?? label}
    </Button>
  );
};
