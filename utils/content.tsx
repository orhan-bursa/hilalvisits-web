import { BlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { proxyImageUrl } from './image'

function getRichTextWithAnnotations(item: RichTextItemResponse, key: any) {
	const { href, plain_text } = item
	const { bold, italic, underline } = item.annotations

	if (!bold && !italic && !underline)
		return href ? (
			<Link key={key} href={href ?? '/'} target="_blank" prefetch={false}>
				{item?.plain_text}
			</Link>
		) : (
			item?.plain_text
		)

	return href ? (
		<Link key={key} href={href ?? '/'} target="_blank" prefetch={false}>
			<span
				className={cn(
					bold ? 'font-bold' : '',
					italic ? 'italic' : '',
					underline ? 'underline' : ''
				)}
			>
				{plain_text}
			</span>
		</Link>
	) : (
		<span
			key={'span' + key}
			className={cn(bold ? 'font-bold' : '', italic ? 'italic' : '', underline ? 'underline' : '')}
		>
			{plain_text}
		</span>
	)
}

export function mapContent(content: BlockObjectResponse, index: number) {
	const key = content.id + index
	switch (content?.type) {
		case 'heading_1':
			if (content.heading_1.rich_text.length === 0)
				return <div key={key} style={{ height: 64 }}></div>
			const h1item = content.heading_1.rich_text?.[0]
			return (
				<h1
					key={key}
					className={cn(
						'min-h-16 text-center text-4xl',
						h1item?.annotations?.bold ? 'font-bold' : '',
						h1item?.annotations?.italic ? 'italic' : '',
						h1item?.annotations?.underline ? 'underline' : ''
					)}
				>
					{h1item?.plain_text}
				</h1>
			)
		case 'heading_2':
			if (content.heading_2.rich_text.length === 0)
				return <div key={key} style={{ height: 48 }}></div>
			const h2item = content.heading_2.rich_text?.[0]
			return (
				<h2
					key={key}
					className={cn(
						'min-h-12 text-3xl',
						h2item?.annotations?.bold ? 'font-bold' : '',
						h2item?.annotations?.italic ? 'italic' : '',
						h2item?.annotations?.underline ? 'underline' : ''
					)}
				>
					{h2item?.plain_text}
				</h2>
			)
		case 'heading_3':
			if (content.heading_3.rich_text.length === 0)
				return <div key={key} style={{ height: 32 }}></div>
			const h3item = content.heading_3.rich_text?.[0]
			return (
				<h3
					key={key}
					className={cn(
						'min-h-8 text-2xl',
						h3item?.annotations?.bold ? 'font-bold' : '',
						h3item?.annotations?.italic ? 'italic' : '',
						h3item?.annotations?.underline ? 'underline' : ''
					)}
				>
					{h3item?.plain_text}
				</h3>
			)

		case 'paragraph':
			if (content.paragraph.rich_text.length === 0)
				return <div key={key} style={{ height: 24 }}></div>
			return (
				<div key={key} className="min-h-6">
					{content.paragraph.rich_text.map((item, ind) =>
						getRichTextWithAnnotations(item, key + ind)
					)}
				</div>
			)
		case 'image':
			return (
				<div
					key={key}
					className="relative mx-auto h-full min-h-[300px] w-full"
					style={{
						maxWidth: '800px',
						paddingTop: '12px',
						paddingBottom: !!content?.image?.caption?.length ? '0px' : '12px'
					}}
				>
					<Image
						sizes="(max-width: 800px) 100vw, 800px"
						alt={content.id + ' image'}
						src={proxyImageUrl(
							content?.image?.type === 'file'
								? content?.image?.file?.url
								: content?.image?.external?.url
						)}
						width={800}
						height={800}
						quality={60}
						style={{ objectFit: 'cover' }}
					/>
					{!!content?.image?.caption?.length ? (
						<p className="px-1 pt-2 text-sm text-[#373737a6]" style={{ paddingBottom: '12px' }}>
							{content.image.caption.map((item, ind) =>
								getRichTextWithAnnotations(item, key + ind)
							)}
						</p>
					) : null}
				</div>
			)
		case 'bulleted_list_item':
			if (content.bulleted_list_item.rich_text.length === 0)
				return <div key={key} style={{ height: 24 }}></div>
			return (
				<li key={key}>
					{content.bulleted_list_item.rich_text.map((item, ind) =>
						getRichTextWithAnnotations(item, key + ind)
					)}
				</li>
			)
		default:
			if (process.env.NODE_ENV === 'development') {
				console.log({ content, env: process.env.NODE_ENV })
				return <div>************Content type not yet added to mapper************</div>
			}
			return null
	}
}
