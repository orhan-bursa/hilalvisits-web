import { ClientConfig, createClient as baseCreateClient, Route } from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'

export const PRISMIC_REPOSITORY_NAME = 'hilal-visits-cms'

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
 * - No `fetchOptions.cache` is set on purpose: `cache: 'no-store'` would opt every
 *   route into dynamic rendering and disable ISR. Freshness is controlled by each
 *   route's `export const revalidate` (and /api/revalidate for on-demand updates).
 * - Development: `next dev` re-renders on every request, so localhost stays fresh.
 * - Draft mode (Prismic Preview): `enableAutoPreviews` makes the client query the
 *   preview ref, and Next.js bypasses the cache for that request only.
 */
export const createClient = (config: ClientConfig = {}) => {
	const client = baseCreateClient(PRISMIC_REPOSITORY_NAME, {
		routes,
		...config
	})

	enableAutoPreviews({ client })

	return client
}
