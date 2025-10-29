import { NextResponse, NextRequest } from "next/server";
const publicPaths = ["/login", "/", "/register"];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value || null;
  // const token = sessionStorage.getItem("auth_token");
  const { pathname } = request.nextUrl;
  const isPublicPath = publicPaths.includes(pathname);

  // console.log(token, "tokennnnn");
  // console.log(isPublicPath, "isPublicPath");
  

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isPublicPath) {
    const dashboardUrl = new URL("/jobseeker", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();

  // Kalau sudah di /login, jangan redirect lagi
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)"], // middleware hanya untuk root "/"
};
