/**
 * Instagram feed endpoint, consumed client-side by the <Instagram /> component.
 *
 * Instagram CDN image URLs are signed and expire after a few days, so they must never be
 * baked into long-lived cached pages. Instead, this route is cached for 1 hour (ISR) and the
 * component fetches it in the browser — pages stay fully static, image URLs stay fresh.
 */

export const revalidate = 3600 // 1 hour

export type InstagramPost = {
	id: string
	caption: string
	url: string
	src: string
}

const FIELDS =
	'media.limit(6){caption,media_url,permalink,thumbnail_url,media_type}'

export async function GET() {
	const instaID = process.env.INSTAGRAM_ID
	const instaToken = process.env.INSTAGRAM_TOKEN

	if (!instaID || !instaToken) {
		return Response.json({ posts: [] as InstagramPost[] })
	}

	try {
		const res = await fetch(
			`https://graph.facebook.com/v16.0/${instaID}?fields=${FIELDS}&access_token=${instaToken}`,
			{ next: { revalidate } }
		)

		if (!res.ok) {
			console.error('[instagram] API error', res.status, await res.text())
			return Response.json({ posts: [] as InstagramPost[] })
		}

		const data = await res.json()
		const posts: InstagramPost[] = (data?.media?.data ?? [])
			.map((post: any) => ({
				id: post.id,
				caption: post.caption ?? '',
				url: post.permalink,
				src: post.thumbnail_url || post.media_url
			}))
			.filter((post: InstagramPost) => !!post.src)

		return Response.json({ posts })
	} catch (err) {
		console.error('[instagram] fetch failed', err)
		return Response.json({ posts: [] as InstagramPost[] })
	}
}
