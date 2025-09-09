import jwt from "jsonwebtoken";
import CONFIG from "@/config/envConfig";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TokenDecodedData, UserRole } from "@/types/user";

const baseRotues = [
  "/dashboard",
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
];
export const roleAccess: Record<string, string[]> = {
  [UserRole.ADMIN]: baseRotues,
  [UserRole.SUPER_ADMIN]: [...baseRotues, "/users"],
  [UserRole.SUPPORT]: [
    "/dashboard",
    "/order-trackings",
    "/messaging",
    "/customers",
  ],
};

export function middleware(req: NextRequest) {
  // get token from cookie
  const token = req.cookies.get("token")?.value;
  // if no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // verify token
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET!) as TokenDecodedData;

    const pathname = req.nextUrl.pathname;

    // find which base route user is trying to access
    const baseRoute = "/" + pathname.split("/")[1];

    // allowed routes for user role
    const allowedRoutes = roleAccess[decoded.role] || [];
    // if user is trying to access a route that is not allowed, redirect to unauthorized
    if (!allowedRoutes.includes(baseRoute)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.log("MIDDLEWARE ERROR:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/categories/:path*",
    "/farmers/:path*",
    "/subscriptions/:path*",
    "/orders/:path*",
    "/inventories/:path*",
    "/farmers/:path*",
    "/order-trackings/:path*",
    "/messaging/:path*",
    "/customers/:path*",
    "/deals/:path*",
    "/promotions/:path*",
    "/users/:path*",
    "/analytics/:path*",
  ],
};
