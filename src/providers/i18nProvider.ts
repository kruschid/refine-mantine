import type { I18nProvider } from "@refinedev/core";

export const i18nProvider: I18nProvider = {
  translate: (_, options, defaultMessage) => typeof options === "string" ? options : defaultMessage ?? "",
  changeLocale: () => null,
  getLocale: () => "en",
};
