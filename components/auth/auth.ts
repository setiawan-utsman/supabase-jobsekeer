"use server";

import { cookies } from "next/headers";

export async function setAuthToken(token: string) {
  const cookiesObj = await cookies();
  cookiesObj.set("auth_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });
}


export async function clearAuthToken() {
  const cookiesObj = await cookies();
  cookiesObj.delete("auth_token");
}
