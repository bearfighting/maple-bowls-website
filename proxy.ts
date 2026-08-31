import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

function negotiatedLocale(request: NextRequest) {
  const remembered = request.cookies.get("maple_bowl_locale")?.value;
  if (remembered && routing.locales.includes(remembered as (typeof routing.locales)[number])) {
    return remembered;
  }

  const accepted = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (accepted.includes("zh")) return "zh";
  if (accepted.includes("fr")) return "fr";
  if (accepted.includes("en")) return "en";
  return routing.defaultLocale;
}

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${negotiatedLocale(request)}`, request.url),
    );
  }

  return handleI18n(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
