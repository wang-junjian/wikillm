import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  const assetPath = path.join(process.cwd(), '../wiki/assets', ...pathSegments);

  try {
    if (!fs.existsSync(assetPath)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(assetPath);
    const ext = path.extname(assetPath).toLowerCase();

    const contentTypeMap: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
    };

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentTypeMap[ext] || 'application/octet-stream',
      },
    });
  } catch (e) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
