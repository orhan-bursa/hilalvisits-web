import { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.prismic.io',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'scontent.cdninstagram.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'scontent-sof1-2.cdninstagram.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'www.instagram.com',
				port: '',
				pathname: '/**'
			}
		]
	}
}

export default nextConfig
