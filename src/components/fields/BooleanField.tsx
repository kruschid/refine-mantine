import { Tooltip, type TooltipProps } from "@mantine/core";
import { IconCircleCheckFilled, IconCircleXFilled, type IconProps, type ReactNode } from "@tabler/icons-react";

export interface BooleanFieldProps {
  value: boolean;
  trueLabel?: string;
  falseLabel?: string;
  trueIcon?: ReactNode;
  falseIcon?: ReactNode;
  trueIconProps?: IconProps;
  falseIconProps?: IconProps;
  tootlipProps?: Omit<TooltipProps, "children" | "label">;
}

export const BooleanField: React.FC<BooleanFieldProps> = ({
  value,
  trueLabel = "true",
  falseLabel = "false",
  trueIcon,
  falseIcon,
  trueIconProps,
  falseIconProps,
  tootlipProps,
}) => (
  <Tooltip label={value ? trueLabel : falseLabel} {...tootlipProps}>
    <span>
      {value
        ? trueIcon ?? <IconCircleCheckFilled size={18} {...trueIconProps} />
        : falseIcon ?? <IconCircleXFilled size={18} {...falseIconProps} />}
    </span>
  </Tooltip>
);
