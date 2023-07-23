import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "./env.mjs";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("authCookie");
  const url = new URL(request.url);
  if (!cookie || cookie.value.length === 0) {
    return NextResponse.redirect(`${url.origin}/auth`);
  }
  const response = NextResponse.next();
  return response;
}
export const config = {
  matcher: ["/", "/images"],
};
