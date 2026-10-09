import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/constants/site'
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
	titleAbsolute = false
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
}

export function buildPrismicPageMetadata({
	metaTitle,
	metaDescription,
	metaImage,
	fallbackImage,
	path,
	fallbackTitle,
	fallbackDescription = SITE_DESCRIPTION,
	openGraphType = 'website'
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
		openGraphType
	})
}
