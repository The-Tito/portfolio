import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_COOKIE, isLocale, resolveLocale } from "@/i18n/config";

/**
 * Redirects locale-less paths (e.g. `/`) to `/es` or `/en`.
 * An explicit choice stored in the locale cookie wins over the browser language.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (isLocale(firstSegment)) return NextResponse.next();

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved) ? saved : resolveLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any path with a file extension (assets, icons, CV).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
