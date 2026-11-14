import { AUTHOR_NAME, SITE_DESCRIPTION, SITE_LOGO, SITE_NAME, SITE_URL } from '@/constants/site'
import { getBlogs } from '@/lib/prismic/services'
import { asImageSrc, asText, isFilled } from '@prismicio/client'

export const revalidate = 86400 // 60 * 60 * 24 => 1 day, same as the pages

const FEED_URL = `${SITE_URL}/feed.xml`
const MAX_ITEMS = 50

const escapeXml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')

/**
 * RSS 2.0 feed of the latest blog posts, for feed readers and automations
 * (newsletters, auto-posting to social media).
 */
export async function GET() {
	const blogs = await getBlogs().catch(() => [])

	const items = blogs.slice(0, MAX_ITEMS).map(blog => {
		const url = `${SITE_URL}/blog/${blog.uid}`
		const published = blog.data.publish_date || blog.first_publication_date
		const description =
			blog.data.meta_description ||
			(blog.data.description ? (asText(blog.data.description) || '').trim() : '')
		const image = isFilled.image(blog.data.cover)
			? asImageSrc(blog.data.cover, { w: 1200 })
			: null
		const category = blog.data.category?.data?.title

		return [
			'<item>',
			`<title>${escapeXml(blog.data.title)}</title>`,
			`<link>${url}</link>`,
			`<guid isPermaLink="true">${url}</guid>`,
			`<pubDate>${new Date(published).toUTCString()}</pubDate>`,
			`<dc:creator>${escapeXml(AUTHOR_NAME)}</dc:creator>`,
			category ? `<category>${escapeXml(category)}</category>` : '',
			description ? `<description>${escapeXml(description)}</description>` : '',
			image ? `<media:content url="${escapeXml(image)}" medium="image" />` : '',
			'</item>'
		]
			.filter(Boolean)
			.join('')
	})

	const lastBuildDate = blogs.length
		? new Date(
				Math.max(...blogs.map(b => new Date(b.last_publication_date).getTime()))
			).toUTCString()
		: new Date().toUTCString()

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>${escapeXml(SITE_NAME)}</title>
<link>${SITE_URL}</link>
<description>${escapeXml(SITE_DESCRIPTION)}</description>
<language>tr-TR</language>
<lastBuildDate>${lastBuildDate}</lastBuildDate>
<atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
<image><url>${SITE_URL}${SITE_LOGO}</url><title>${escapeXml(SITE_NAME)}</title><link>${SITE_URL}</link></image>
${items.join('\n')}
</channel>
</rss>`

	return new Response(xml, {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
	})
}
