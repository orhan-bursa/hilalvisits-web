export function proxyImageUrl(source: string) {
	const encodedUrl = encodeURIComponent(source)
	const proxiedUrl = `/api/image-proxy?url=${encodedUrl}`

	return proxiedUrl
}
