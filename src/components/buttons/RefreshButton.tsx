import { ActionIcon, type ActionIconProps, Button, type ButtonProps } from "@mantine/core";
import { useRefreshButton } from "@refinedev/core";
import type { RefineRefreshButtonProps } from "@refinedev/ui-types";
import { type IconProps, IconRefresh } from "@tabler/icons-react";
import type React from "react";

export type RefreshButtonProps = RefineRefreshButtonProps<{
  iconProps?: IconProps;
  actionIconProps?: ActionIconProps;
  buttonProps?: ButtonProps;
  disabled?: boolean;
}>;

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  resource,
  recordItemId,
  hideText = false,
  dataProviderName,
  children,
  iconProps,
  actionIconProps,
  buttonProps,
  disabled,
  onClick,
}) => {
  const {
    onClick: onRefresh,
    label,
    loading,
  } = useRefreshButton({
    resource,
    id: recordItemId,
    dataProviderName,
  });

  return hideText ? (
    <ActionIcon
      variant="default"
      onClick={onClick ? onClick : onRefresh}
      loading={loading}
      disabled={disabled}
      aria-label={label}
      {...actionIconProps}
    >
      <IconRefresh size={18} {...iconProps} />
    </ActionIcon>
  ) : (
    <Button
      variant="default"
      leftSection={<IconRefresh size={18} {...iconProps} />}
      loading={loading}
      disabled={disabled}
      onClick={onClick ? onClick : onRefresh}
      {...buttonProps}
    >
      {children ?? label}
    </Button>
  );
};
