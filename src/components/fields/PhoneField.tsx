import { IconPhoneOutgoing } from "@tabler/icons-react";
import { UrlField, UrlFieldProps } from "./UrlField";

export const PhoneField: React.FC<UrlFieldProps> = (props) =>
  <UrlField
    icon={IconPhoneOutgoing}
    {...props}
    anchorProps={{ href: `tel:${props.value}`, ...props.anchorProps }}
  />;
