import { auth } from "@/auth"
import { NextResponse } from "next/server"

export const middleware = auth((req) => {
  // If not authenticated, redirect to login
  if (!req.auth) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Protect dashboard routes
    "/dashboard/:path*",
    "/processos/:path*",
    "/salvados/:path*",
    "/financeiro/:path*",
    "/cadastros/:path*",
    "/relatorios/:path*",
  ],
}
