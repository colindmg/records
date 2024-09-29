import { MongoClient } from "mongodb";
import { notFound } from "next/navigation";
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
      notFound();
    }

    return NextResponse.json({ topTracks: userData.topTracks });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await client.close();
  }
}
