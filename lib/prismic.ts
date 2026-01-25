import * as prismic from '@prismicio/client'

const endpoint = prismic.getRepositoryEndpoint('hilal-visits-cms')

const prismicClient = prismic.createClient(endpoint, {
	fetchOptions:
		process.env.NODE_ENV === 'production'
			? {
					cache: 'force-cache',
					next: { revalidate: 60 * 60 * 24 }
				}
			: { cache: 'no-store' }
})

export default prismicClient
