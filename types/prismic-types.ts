import { PrismicDocument } from '@prismicio/client'

type BasePageData = {
	meta_title: any
	meta_image: any
	meta_description: any
	slices: any
}

type IImageContent = {
	dimensions: {
		width: number
		height: number
	}
	alt: string | null
	copyright: string | null
	url: string
	id: string
	edit: {
		x: number
		y: number
		zoom: number
		background: string
	}
}

export type CategoryFields = BasePageData & {
	title: string
	parent_category: { data: { title: string } }
}

export type CategoryPageDocument = PrismicDocument<CategoryFields>

export type BlogFields = BasePageData & {
	title: string
	description: any
	cover: IImageContent
	publish_date: string
	category: { data: { title: string } }
}

export type BlogPageDocument = PrismicDocument<BlogFields>
