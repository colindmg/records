import { refreshAccessToken } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const refresh_token = searchParams.get("refresh_token");

  if (!refresh_token) {
    return NextResponse.json(
      { error: "No refresh token provided" },
      { status: 400 }
    );
  }

  try {
    const { access_token } = await refreshAccessToken(refresh_token);
    return NextResponse.json({ access_token });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    );
  }
}
