import { ActionIcon, type ActionIconProps, Button, type ButtonProps } from "@mantine/core";
import { useExportButton } from "@refinedev/core";
import type { RefineExportButtonProps } from "@refinedev/ui-types";
import { IconFileExport, type IconProps } from "@tabler/icons-react";

export type ExportButtonProps = RefineExportButtonProps<{
  iconProps?: IconProps;
  actionIconProps?: ActionIconProps;
  buttonProps?: ButtonProps;
  disabled?: boolean;
}>;

export const ExportButton: React.FC<ExportButtonProps> = ({
  hideText = false,
  children,
  loading = false,
  iconProps,
  actionIconProps,
  buttonProps,
  disabled,
  onClick,
}) => {
  const { label } = useExportButton();

  return hideText ? (
    <ActionIcon
      variant="default"
      loading={loading}
      disabled={disabled}
      aria-label={label}
      onClick={onClick}
      {...actionIconProps}
    >
      <IconFileExport size={18} {...iconProps} />
    </ActionIcon>
  ) : (
    <Button
      variant="default"
      loading={loading}
      disabled={disabled}
      leftSection={<IconFileExport size={18} {...iconProps} />}
      onClick={onClick}
      {...buttonProps}
    >
      {children ?? label}
    </Button>
  );
};