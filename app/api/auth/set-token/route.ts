import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token } = await request.json();

  const res = NextResponse.json({ message: "Token set successfully" });
  res.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
