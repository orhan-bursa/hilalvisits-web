'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './styles.css'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import { Alert } from '@mui/material'
import cn from 'classnames'
import { shortenText } from '@/utils/text'
import { BlogPageObject } from '@/types'
import { destructureBlogProps } from '@/utils'
import { proxyImageUrl } from '@/utils/image'

export default function HomeHero({ items }: { items: BlogPageObject[] | undefined }) {
	//const progressCircle = useRef(null);
	//const progressContent = useRef(null);
	// const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
	//   (progressCircle?.current as any)?.style?.setProperty('--progress', 1 - progress);
	//   (progressContent?.current as any).textContent = ` · `; //${Math.ceil(time / 1000)}s
	// };

	if (!items || !items.length) return <Alert>Unable to retrieve data from server</Alert>

	return (
		<section className={cn('relative mx-auto cursor-default', 'max-w-[1200px] md:flex md:gap-8')}>
			<div className="h-full w-full">
				<Swiper
					className="home-hero-swiper"
					speed={500}
					breakpoints={{
						0: {
							slidesPerView: 1
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 16
						},
						1024: {
							spaceBetween: 32,
							slidesPerView: 2
						}
					}}
					loop={true}
					pagination={{
						clickable: true
					}}
					navigation={true}
					modules={[Navigation, Pagination, Autoplay]}
					autoplay={{
						delay: 20000
					}}
					// onAutoplayTimeLeft={onAutoplayTimeLeft}
					style={{
						width: '100%',
						height: '100%',
						marginLeft: 'auto',
						marginRight: 'auto',
						paddingBottom: 40
					}}
				>
					{items.map((item, ind) => {
						const { cover, title, description, slug } = destructureBlogProps(item)
						const url = proxyImageUrl(cover)

						return (
							<SwiperSlide
								key={ind}
								style={{
									textAlign: 'center',
									fontSize: '18px',
									background: '#fff',
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'column'
								}}
							>
								<div className="relative h-[400px] w-full md:h-[500px]">
									<Image
										src={url ?? ''}
										alt={title ?? ''}
										fill
										style={{ objectFit: 'cover' }}
										sizes={`
                   (max-width: 768px) 100vw,
                   (max-width: 1024px) calc(50vw-8px),
                   (max-width: 1200px) calc(50vw-16px),
                   584px
                   `}
										priority
									/>
								</div>
								<div className="absolute bottom-[25%] z-50 w-full space-x-2 bg-black bg-opacity-40 text-white">
									<h2 className="my-2 line-clamp-1 text-3xl font-[500] md:text-4xl">
										{title ?? 'No title'}
									</h2>
									<p>{shortenText(description, 100, 15)}</p>
									<Link href={`/blog/${slug}`}>
										<button className="my-2 border-b-2 border-gray-400 p-1 text-sm italic md:text-lg">
											Devamı
										</button>
									</Link>
								</div>
							</SwiperSlide>
						)
					})}
					{/* <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div> */}
				</Swiper>
			</div>
		</section>
	)
}
