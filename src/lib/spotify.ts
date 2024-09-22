import axios from "axios";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const getAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: client_id!,
        client_secret: client_secret!,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response.data);
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Spotify access token:", error);
    throw new Error("Failed to get Spotify access token");
  }
};

export { getAccessToken };
