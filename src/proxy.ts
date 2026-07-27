import { NextResponse } from "next/server";
import { headers } from "next/headers";
import type { NextRequest } from 'next/server';
import { auth } from "./lib/auth"; // Ensure this path points to your server auth instance

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    // 1. Authentication Check: If no session, bounce to login
    if (!session || !session.user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname + request.nextUrl.search);
        return NextResponse.redirect(loginUrl);
    }



    return NextResponse.next();
}

export const config = {
    // Target all sub-routes of /dashboard and sub-routes of /properties
    matcher: ["/dashboard/:path*", "/createpost"], 
};