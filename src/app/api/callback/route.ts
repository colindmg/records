import { getAccessToken } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = request.cookies.get("spotify_auth_state")?.value;

  if (state === null || state !== storedState) {
    return NextResponse.redirect(
      new URL("/error?message=state_mismatch", request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/error?message=no_code", request.url)
    );
  }

  try {
    const { access_token, refresh_token } = await getAccessToken(code);

    // Créez une URL pour la page d'accueil
    const homeUrl = new URL("/", request.url);
    // Ajoutez les paramètres à l'URL
    homeUrl.hash = `client=spotify&access_token=${access_token}&refresh_token=${refresh_token}`;

    const response = NextResponse.redirect(homeUrl);
    response.cookies.delete("spotify_auth_state");

    return response;
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.redirect(
      new URL("/error?message=authentication_error", request.url)
    );
  }
}
