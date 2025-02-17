// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const isLoggedIn = request.cookies.get("isLoggedIn"); // Check if user is logged in via cookie or local storage

  // If the user is not logged in and is trying to access the root directory, redirect to login
  if (!isLoggedIn && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/loginpage", request.url)); // Redirect to LoginPage
  }
  //   if (!isLoggedIn && request.nextUrl.pathname === "/dashboard") {
  //     return NextResponse.redirect(new URL("/loginpage", request.url)); // Redirect to LoginPage
  //   }

  // Allow the request if the user is logged in or accessing other routes
  return NextResponse.next();
}

// This middleware applies to the root path ('/')
export const config = {
  matcher: ["/", "/dashboard", "/profile"], // You can add more protected pages here
};
