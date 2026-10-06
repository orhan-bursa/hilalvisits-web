import { ClientConfig, createClient as baseCreateClient, Route } from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'

export const PRISMIC_REPOSITORY_NAME = 'hilal-visits-cms'

/** 24h – production pages & Prismic responses are refreshed (ISR) once a day. */
export const REVALIDATE_SECONDS = 60 * 60 * 24

/**
 * Route resolvers, used by Prismic to build `document.url`.
 * Required for Prismic Previews so the "Preview" button opens the correct page.
 */
const routes: Route[] = [
	{ type: 'blog', path: '/blog/:uid' },
	{ type: 'info_page', path: '/-/:uid' },
	{
		type: 'category',
		// Placeholder names can't contain underscores, so `:parent` maps to the `parent_category` field.
		path: '/:parent?/:uid',
		resolvers: { parent: 'parent_category' }
	}
]

/**
 * Creates a Prismic client.
 *
 * - Production: responses are cached in the Next.js data cache for 24h (ISR).
 * - Development: no caching, so localhost always shows the latest content.
 * - Draft mode (Prismic Preview): `enableAutoPreviews` makes the client query the
 *   preview ref, and Next.js bypasses the cache for that request only.
 */
export const createClient = (config: ClientConfig = {}) => {
	const client = baseCreateClient(PRISMIC_REPOSITORY_NAME, {
		routes,
		fetchOptions:
			process.env.NODE_ENV === 'production'
				? { next: { revalidate: REVALIDATE_SECONDS } }
				: { cache: 'no-store' },
		...config
	})

	enableAutoPreviews({ client })

	return client
}
