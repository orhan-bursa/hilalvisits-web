import * as prismic from '@prismicio/client'

const endpoint = prismic.getRepositoryEndpoint('hilal-visits-cms')

const prismicClient = prismic.createClient(endpoint, {
	fetchOptions:
		process.env.NODE_ENV === 'production' ? { cache: 'force-cache' } : { cache: 'no-store' }
})

export default prismicClient
