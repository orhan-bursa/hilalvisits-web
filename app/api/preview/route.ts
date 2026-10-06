import { createClient } from '@/lib/prismic/client'
import { redirectToPreviewURL } from '@prismicio/next'
import { NextRequest } from 'next/server'

/**
 * Prismic Preview entry point.
 * Configure in Prismic: Settings → Previews → Domain `https://hilalvisits.com`, Route `/api/preview`.
 *
 * Enables Next.js draft mode (cookie scoped to the previewer's browser) and redirects to the
 * previewed document. Regular visitors keep getting the cached, published pages.
 */
export async function GET(request: NextRequest) {
	const client = createClient()

	return await redirectToPreviewURL({ client, request })
}
