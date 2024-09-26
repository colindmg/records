import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const client = new MongoClient(process.env.MONGODB_URI as string);

  try {
    await client.connect();
    const database = client.db("spotify_data_db");
    const collection = database.collection("user_data_collection");

    const userData = await collection.findOne({ userId: params.userId });

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ topTracks: userData.topTracks });
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
