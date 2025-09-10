import { jwtVerify } from "jose";
import { UserRole } from "@/types/user";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Convert secret to Uint8Array for jose
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const baseRoutes = [
  "/products",
  "/categories",
  "/farmers",
  "/subscriptions",
  "/orders",
  "/inventories",
  "/order-trackings",
  "/messaging",
  "/customers",
  "/deals",
  "/promotions",
  "/analytics",
  "/",
];

export const roleAccess: Record<UserRole, string[]> = {
  [UserRole.ADMIN]: baseRoutes,
  [UserRole.SUPER_ADMIN]: [...baseRoutes, "/users"],
  [UserRole.SUPPORT]: ["/order-trackings", "/messaging", "/customers"],
};

export async function middleware(req: NextRequest) {
  // get token from cookie
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // verify token
    const { payload } = await jwtVerify(token, JWT_SECRET);

    const decoded = payload;
    const pathname = req.nextUrl.pathname;

    // find which base route user is trying to access
    const baseRoute = "/" + pathname.split("/")[1];

    // allowed routes for this user role
    const allowedRoutes = roleAccess[decoded.role as UserRole] || [];

    if (!allowedRoutes.includes(baseRoute)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("MIDDLEWARE ERROR:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/products/:path*",
    "/categories/:path*",
    "/farmers/:path*",
    "/subscriptions/:path*",
    "/orders/:path*",
    "/inventories/:path*",
    "/order-trackings/:path*",
    "/messaging/:path*",
    "/customers/:path*",
    "/deals/:path*",
    "/promotions/:path*",
    "/users/:path*",
    "/analytics/:path*",
    "/",
  ],
};
