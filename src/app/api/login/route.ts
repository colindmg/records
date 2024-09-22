import { generateRandomString, getAuthorizationUrl } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  const state = generateRandomString(16);
  const url = getAuthorizationUrl(state);

  const response = NextResponse.redirect(url);
  response.cookies.set("spotify_auth_state", state, { httpOnly: true });

  return response;
}
