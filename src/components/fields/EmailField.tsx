import { IconMailShare } from "@tabler/icons-react";
import { UrlField, UrlFieldProps } from "./UrlField";

export const EmailField: React.FC<UrlFieldProps> = (props) =>
  <UrlField
    icon={IconMailShare}
    {...props}
    anchorProps={{ href: `mailto:${props.value}`, ...props.anchorProps }}
  />;
