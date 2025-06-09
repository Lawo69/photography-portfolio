import { NextResponse } from 'next/server';
import clientPromise from '../lib/mongodb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, imageUrl } = body;

    if (!title || !category || !imageUrl) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('SnapbyMadz');
    const collection = db.collection('images');

    const result = await collection.insertOne({
      title,
      category,
      imageUrl,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Saved!', id: result.insertedId });
  } catch (err) {
    console.error('MongoDB Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('SnapbyMadz');
    const collection = db.collection('images');

    const images = await collection.find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json(images);
  } catch (err) {
    console.error('Fetch Images Error:', err);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}