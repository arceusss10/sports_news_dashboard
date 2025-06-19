import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "admin";
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    // Redirect from auth page if already logged in
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Protect admin routes
    if (isAdminPage && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/auth/signin"],
}; 