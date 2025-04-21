'use client'
import { FacebookRounded, Instagram, Twitter, YouTube, X } from '@mui/icons-material'

export const SOCIAL_LINKS = {
	instagram: 'https://www.instagram.com/hilalvisits/',
	facebook: 'https://www.facebook.com/hilalvisits/',
	twitter: 'https://twitter.com/hilalvisits',
	threads: 'https://www.threads.net/@hilalvisits',
	youtube: 'https://www.youtube.com/@hilalvisits'
}

export const SOCIAL_MENU_ITEMS = [
	{
		title: 'Instagram',
		href: SOCIAL_LINKS.instagram,
		icon: Instagram
	},
	{
		title: 'Twitter',
		href: SOCIAL_LINKS.twitter,
		icon: X
	},
	// {
	// 	title: 'Facebook',
	// 	href: SOCIAL_LINKS.facebook,
	// 	icon: FacebookRounded
	// },
	{
		title: 'Youtube',
		href: SOCIAL_LINKS.youtube,
		icon: YouTube
	}
]
