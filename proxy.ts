import { NextRequest } from "next/server";
import { proxy as adminProxy } from "@/ts/proxy";

export async function proxy(request: NextRequest) {
  return adminProxy(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
