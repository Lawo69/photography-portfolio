import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: 'dzvqsggsx',
  api_key: '252932795222558',
  api_secret: 'SSS8zj5Po87-o8KvZL36jHH8TkA',
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({}, (error, result) => {
      if (error) reject(error);
      resolve(result);
    }).end(buffer);
  });

  return NextResponse.json(result);
}
