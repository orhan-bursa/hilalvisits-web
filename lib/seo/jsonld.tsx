import {
	AUTHOR_IMAGE,
	AUTHOR_NAME,
	AUTHOR_URL,
	DEFAULT_OG_IMAGE,
	SITE_DESCRIPTION,
	SITE_LOGO,
	SITE_NAME,
	SITE_URL
} from '@/constants/site'
import { SOCIAL_LINKS } from '@/constants/social'
import { BlogPageDocument } from '@/types/prismic-types'
import { asImageSrc, asText, isFilled } from '@prismicio/client'

/**
 * schema.org structured data (JSON-LD) for Google rich results.
 * Validate with https://search.google.com/test/rich-results
 */

type JsonLdObject = Record<string, unknown>

const absoluteUrl = (path: string) =>
	path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

// Stable @ids so entities on different pages reference the same Person / WebSite.
const WEBSITE_ID = `${SITE_URL}/#website`
const PERSON_ID = `${SITE_URL}/#person`

export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
	const graph = Array.isArray(data) ? data : [data]
	const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })

	return (
		<script
			type="application/ld+json"
			// Escape "<" so content from the CMS can't close the script tag.
			dangerouslySetInnerHTML={{ __html: json.replace(/</g, '\\u003c') }}
		/>
	)
}

export function personSchema(): JsonLdObject {
	return {
		'@type': 'Person',
		'@id': PERSON_ID,
		name: AUTHOR_NAME,
		url: absoluteUrl(AUTHOR_URL),
		image: absoluteUrl(AUTHOR_IMAGE),
		jobTitle: 'Yönetmen',
		sameAs: Object.values(SOCIAL_LINKS)
	}
}

export function websiteSchema(): JsonLdObject {
	return {
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		url: SITE_URL,
		name: SITE_NAME,
		description: SITE_DESCRIPTION,
		inLanguage: 'tr-TR',
		publisher: { '@id': PERSON_ID },
		image: absoluteUrl(SITE_LOGO)
	}
}

export type BreadcrumbItem = { name: string; path: string }

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: absoluteUrl(item.path)
		}))
	}
}

export function blogPostingSchema(blog: BlogPageDocument): JsonLdObject {
	const url = absoluteUrl(`/blog/${blog.uid}`)
	const description =
		blog.data.meta_description ||
		(blog.data.description ? (asText(blog.data.description) || '').trim().slice(0, 300) : undefined) ||
		undefined

	const images = [blog.data.meta_image, blog.data.cover]
		.filter(img => isFilled.image(img))
		.map(img => asImageSrc(img, { w: 1200 }))
		.filter(Boolean) as string[]

	return {
		'@type': 'BlogPosting',
		'@id': `${url}#article`,
		mainEntityOfPage: url,
		url,
		headline: blog.data.title,
		description,
		image: images.length ? images : [absoluteUrl(DEFAULT_OG_IMAGE)],
		datePublished: blog.data.publish_date || blog.first_publication_date,
		dateModified: blog.last_publication_date,
		inLanguage: 'tr-TR',
		author: { '@id': PERSON_ID, '@type': 'Person', name: AUTHOR_NAME, url: absoluteUrl(AUTHOR_URL) },
		publisher: { '@id': PERSON_ID },
		isPartOf: { '@id': WEBSITE_ID },
		articleSection: blog.data.category?.data?.title
	}
}
