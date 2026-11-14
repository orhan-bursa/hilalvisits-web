import {
	AUTHOR_URL,
	DEFAULT_OG_IMAGE,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL
} from '@/constants/site'
import { asImageSrc, ImageFieldImage, isFilled } from '@prismicio/client'
import type { Metadata } from 'next'

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

type BuildPageMetadataOptions = {
	title: string
	description?: string
	path: string
	image?: string | null
	imageAlt?: string
	openGraphType?: 'website' | 'article'
	titleAbsolute?: boolean
	article?: ArticleMetadata
}

export type ArticleMetadata = {
	publishedTime?: string
	modifiedTime?: string
	section?: string
}

function resolveUrl(path: string) {
	if (path.startsWith('http')) return path
	return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildPageMetadata({
	title,
	description,
	path,
	image,
	imageAlt,
	openGraphType = 'website',
	titleAbsolute = false,
	article
}: BuildPageMetadataOptions): Metadata {
	const url = resolveUrl(path)
	const ogImage = image || resolveUrl(DEFAULT_OG_IMAGE)

	return {
		title: titleAbsolute ? { absolute: title } : title,
		description,
		alternates: {
			canonical: url
		},
		openGraph: {
			type: openGraphType,
			...(openGraphType === 'article' && {
				publishedTime: article?.publishedTime,
				modifiedTime: article?.modifiedTime,
				section: article?.section,
				authors: [resolveUrl(AUTHOR_URL)]
			}),
			locale: 'tr_TR',
			siteName: SITE_NAME,
			title,
			description,
			url,
			images: [
				{
					url: ogImage,
					alt: imageAlt || title,
					width: OG_IMAGE_WIDTH,
					height: OG_IMAGE_HEIGHT
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage]
		}
	}
}

type BuildPrismicPageMetadataOptions = {
	metaTitle?: string | null
	metaDescription?: string | null
	metaImage?: ImageFieldImage | null
	fallbackImage?: ImageFieldImage | null
	path: string
	fallbackTitle: string
	fallbackDescription?: string
	openGraphType?: 'website' | 'article'
	article?: ArticleMetadata
}

export function buildPrismicPageMetadata({
	metaTitle,
	metaDescription,
	metaImage,
	fallbackImage,
	path,
	fallbackTitle,
	fallbackDescription = SITE_DESCRIPTION,
	openGraphType = 'website',
	article
}: BuildPrismicPageMetadataOptions): Metadata {
	const selectedImage = isFilled.image(metaImage)
		? metaImage
		: isFilled.image(fallbackImage)
			? fallbackImage
			: null

	// Automatically enforces 1200x630 crop on Prismic's Imgix CDN for any image
	const image = selectedImage
		? asImageSrc(selectedImage, {
				w: OG_IMAGE_WIDTH,
				h: OG_IMAGE_HEIGHT,
				fit: 'crop'
			})
		: null

	return buildPageMetadata({
		title: metaTitle || fallbackTitle,
		description: metaDescription || fallbackDescription,
		path,
		image,
		imageAlt: selectedImage?.alt || metaTitle || fallbackTitle,
		openGraphType,
		article
	})
}

/** Trims text to `max` chars without cutting a word in half (for meta descriptions). */
export function truncateAtWord(text: string, max = 160) {
	const clean = text.replace(/\s+/g, ' ').trim()
	if (clean.length <= max) return clean
	const cut = clean.slice(0, max - 1)
	const lastSpace = cut.lastIndexOf(' ')
	return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:–-]+$/, '')}…`
}
