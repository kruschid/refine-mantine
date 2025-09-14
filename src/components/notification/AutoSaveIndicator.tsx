import { Badge, type BadgeProps, type DefaultMantineColor, Loader } from "@mantine/core";
import {
  type AutoSaveIndicatorProps as RefineAutoSaveIndicatorProps,
  useTranslate
} from "@refinedev/core";
import {
  IconCircleCheck,
  IconDots,
  IconExclamationCircle
} from "@tabler/icons-react";
import type React from "react";

export interface AutoSaveIndicatorProps {
  status: RefineAutoSaveIndicatorProps["status"];
  badgeProps?: BadgeProps;
  iconSize?: number;
}

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  badgeProps,
  iconSize = 12,
}) => {
  const translate = useTranslate();
  
  const [label, Icon, color]: [
    string,
    React.FC<{size: number}>,
    DefaultMantineColor | undefined
  ] = status === "success" ? [
    translate("autoSave.success", "saved"),
    IconCircleCheck,
    undefined,
  ] : status === "error" ? [
    translate("autoSave.error", "auto save failure"),
    IconExclamationCircle,
    "red"
  ] : status === "pending" ? [
    translate("autoSave.loading", "saving..."),
    Loader,
    undefined,
  ] : [
    translate("autoSave.idle", "waiting for changes"),
    IconDots,
    undefined,
  ]

  return (
    <Badge
      variant="light"
      leftSection={<Icon size={iconSize} />}
      color={color}
      {...badgeProps}
    >
      {label}
    </Badge>
  );
};
