import * as prismic from '@prismicio/client'

const endpoint = prismic.getRepositoryEndpoint('hilal-visits-cms')

const prismicClient = prismic.createClient(endpoint)

export default prismicClient
