import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow login & signup pages
  // if (pathname === "/login" || pathname === "/signup") {
  //   return NextResponse.next();
  // }

  // TEMP: user not logged in → redirect to login
  // const isLoggedIn = true;

  // if (!isLoggedIn) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

// Apply middleware to these routes
export const config = {
  matcher: ["/", "/upload", "/dashboard", "/result"],
};
