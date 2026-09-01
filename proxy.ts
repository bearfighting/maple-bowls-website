import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import type { Locale } from "./lib/types";

const handleI18n = createMiddleware(routing);

function negotiatedLocale(request: NextRequest) {
  const remembered = request.cookies.get("maple_bowl_locale")?.value;
  if (remembered && isLocale(remembered)) {
    return remembered;
  }

  const accepted = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const languages = accepted
    .split(",")
    .map((part, index) => {
      const [range, ...parameters] = part.trim().split(";");
      const quality = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const q = quality ? Number.parseFloat(quality.trim().slice(2)) : 1;
      return { range, q: Number.isNaN(q) ? 0 : q, index };
    })
    .filter((language) => language.range && language.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);

  for (const language of languages) {
    const languageCode = language.range.split("-")[0];
    if (isLocale(languageCode)) return languageCode;
  }

  return routing.defaultLocale;
}

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/${negotiatedLocale(request)}`, request.url));
  }

  const response = handleI18n(request);
  const locale = request.nextUrl.pathname.split("/")[1];
  if (locale && isLocale(locale)) {
    response.cookies.set("maple_bowl_locale", locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
  }
  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
