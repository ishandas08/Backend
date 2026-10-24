
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const token = request.cookies.get("token")?.value;

    const isPublicPath =
        path === "/login" ||
        path === "/signup";

    const isProfilePath =
        path === "/profile" ||
        path.startsWith("/profile/");

    // Allow everyone to access login and signup
    if (isPublicPath) {
        return NextResponse.next();
    }

    // Protect all profile routes
    if (isProfilePath && !token) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/signup",
        "/profile/:path*",
    ],
};
