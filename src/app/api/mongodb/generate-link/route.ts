import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const client = new MongoClient(process.env.MONGODB_URI as string);

const connectToDatabase = async () => {
  if (!client.connect()) {
    await client.connect();
  }
  const database = client.db("spotify_data_db");
  const collection = database.collection("user_data_collection");
  return collection;
};

export async function POST(request: NextRequest) {
  try {
    const { topTracks } = await request.json();
    const accessToken = request.headers.get("Authorization")?.split(" ")[1];

    if (!accessToken) {
      return NextResponse.json(
        { error: "No access token provided" },
        { status: 401 }
      );
    }

    // Fetch user data from Spotify
    const spotifyResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!spotifyResponse.ok) {
      throw new Error("Failed to fetch user data from Spotify");
    }

    const userData = await spotifyResponse.json();
    const userId = userData.id;

    // Connect to MongoDB and update/insert user data
    const collection = await connectToDatabase();

    await collection.updateOne(
      { userId: userId },
      {
        $set: {
          userId: userId,
          topTracks: topTracks,
        },
      },
      { upsert: true }
    );

    // Generate a unique link (you might want to implement a more sophisticated method)
    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/share/${userId}`;

    return NextResponse.json({ link: link }, { status: 200 });
  } catch (error) {
    console.error("Error in generate-link API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
