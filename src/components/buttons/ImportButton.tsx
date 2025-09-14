import { ActionIcon, type ActionIconProps, Button, type ButtonProps } from "@mantine/core";
import { type UseImportInputPropsType, useImportButton } from "@refinedev/core";
import type { RefineImportButtonProps } from "@refinedev/ui-types";
import { IconFileImport, type IconProps } from "@tabler/icons-react";
import { useId } from "react";

export type ImportButtonProps = RefineImportButtonProps<{
  inputProps: UseImportInputPropsType & React.InputHTMLAttributes<HTMLInputElement>;
  iconProps?: IconProps;
  actionIconProps?: ActionIconProps;
  buttonProps?: ButtonProps;
  disabled?: boolean;
}>;

export const ImportButton: React.FC<ImportButtonProps> = ({
  hideText = false,
  loading = false,
  children,
  inputProps,
  iconProps,
  actionIconProps,
  buttonProps,
  disabled,
}) => {
  const { label } = useImportButton();
  const inputId  = useId();

  return (
    <label htmlFor={inputId}>
      <input
        id={inputId}
        multiple
        hidden
        {...inputProps}
      />
        {hideText ? (
          <ActionIcon
            variant="default"
            aria-label={label}
            component="span"
            loading={loading}
            disabled={disabled}
            {...actionIconProps}
          >
            <IconFileImport size={18} {...iconProps} />
          </ActionIcon>
        ) : (
          <Button
            variant="default"
            component="span"
            leftSection={<IconFileImport size={18} {...iconProps} />}
            loading={loading}
            disabled={disabled}
            {...buttonProps}
          >
            {children ?? label}
          </Button>
      )}
    </label>
  );
};
