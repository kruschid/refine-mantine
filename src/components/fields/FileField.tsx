import { IconFileDownloadFilled } from "@tabler/icons-react";
import { UrlField, UrlFieldProps } from "./UrlField";

export const FileField: React.FC<UrlFieldProps> = (props) =>
  <UrlField
    icon={IconFileDownloadFilled}
    {...props}
  />;