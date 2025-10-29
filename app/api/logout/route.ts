import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");

  return NextResponse.json({ message: "Logout success" }, { status: 200 });
}
