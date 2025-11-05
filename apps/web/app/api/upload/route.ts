import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 })
    }

    if (!request.body) {
      return NextResponse.json({ error: 'No file data provided' }, { status: 400 })
    }

    // Upload to Vercel Blob
    const blob = await put(filename, request.body, {
      access: 'public',
      addRandomSuffix: true,
    })

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      downloadUrl: blob.downloadUrl,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
