import { handlers } from "@/auth"
import type { NextRequest } from "next/server"

export const GET = handlers.GET as (request: NextRequest, context: { params: Promise<{ nextauth: string[] }> }) => Promise<Response>
export const POST = handlers.POST as (request: NextRequest, context: { params: Promise<{ nextauth: string[] }> }) => Promise<Response>
