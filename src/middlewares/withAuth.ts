import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const onlyAdmin: string[] = ["/dashboard"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: "CXExh62P7UK4uEBl5rfIIOanEoU=",
      });

      if (!token) {
        const url = new URL("/auth/login", req.url);
        return NextResponse.redirect(url);
      }

      if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
        return NextResponse.redirect(new URL("/404", req.url));
      }
    }

    return middleware(req, next);
  };
}
