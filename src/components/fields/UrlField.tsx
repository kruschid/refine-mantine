import { Anchor, AnchorProps, PolymorphicComponentProps, Text, TextProps } from "@mantine/core";
import { IconExternalLink, IconProps, ReactNode } from "@tabler/icons-react";

export interface UrlFieldProps {
  value: string;
  children?: ReactNode;
  anchorProps?: PolymorphicComponentProps<"a", AnchorProps>;
  textProps?: TextProps;
  iconProps?: IconProps;
  icon?: React.FC<IconProps>;
}

export const UrlField: React.FC<UrlFieldProps> = ({
  children,
  value,
  anchorProps,
  textProps,
  icon,
  iconProps,
}) => {
  const Icon = icon ?? IconExternalLink;

  return (
    <Anchor
      href={value}
      style={{display: "inline-flex", alignItems: "center"}}
      {...anchorProps}
    >
      <Text {...textProps}>
        {children ?? value}
      </Text>
      <Icon
        size={
          textProps?.size === "xs" ? 12 
          : textProps?.size === "sm" ? 14
          : textProps?.size === "md" ? 16
          : textProps?.size === "lg" ? 18
          : textProps?.size === "xl" ? 20
          : 16
        }
        style={{ marginLeft: 4, flexShrink: 0 }}
        aria-hidden
        {...iconProps}
      />
    </Anchor>
  );
}
