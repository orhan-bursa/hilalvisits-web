import { Jost, Whisper } from 'next/font/google'

export const jost = Jost({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700']
})

export const whisper = Whisper({
	subsets: ['latin'],
	weight: '400',
	display: 'swap'
})
