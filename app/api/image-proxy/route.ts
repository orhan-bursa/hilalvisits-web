import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const url = searchParams.get('url')

	if (!url) {
		return new NextResponse('Missing image URL', { status: 400 })
	}

	try {
		const imageRes = await fetch(url)

		if (!imageRes.ok) {
			return new NextResponse('Failed to fetch image', { status: imageRes.status })
		}

		const contentType = imageRes.headers.get('Content-Type') || 'image/jpeg'
		const buffer = await imageRes.arrayBuffer()

		return new NextResponse(buffer, {
			status: 200,
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=86400' // optional: cache for 1 day
			}
		})
	} catch (err) {
		return new NextResponse('Error fetching image', { status: 500 })
	}
}
