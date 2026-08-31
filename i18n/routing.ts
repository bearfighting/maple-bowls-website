import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en", "fr"],
  defaultLocale: "zh",
  localePrefix: "always",
});
