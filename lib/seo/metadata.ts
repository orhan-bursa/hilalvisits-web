import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/constants/site'
import { asImageSrc, ImageFieldImage } from '@prismicio/client'
import type { Metadata } from 'next'

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
	const ogImage = image || DEFAULT_OG_IMAGE

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
					alt: imageAlt || title
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
	path: string
	fallbackTitle: string
	fallbackDescription?: string
	openGraphType?: 'website' | 'article'
}

export function buildPrismicPageMetadata({
	metaTitle,
	metaDescription,
	metaImage,
	path,
	fallbackTitle,
	fallbackDescription = SITE_DESCRIPTION,
	openGraphType = 'website'
}: BuildPrismicPageMetadataOptions): Metadata {
	return buildPageMetadata({
		title: metaTitle || fallbackTitle,
		description: metaDescription || fallbackDescription,
		path,
		image: metaImage ? asImageSrc(metaImage) : null,
		imageAlt: metaImage?.alt || metaTitle || fallbackTitle,
		openGraphType
	})
}
