import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * On-demand revalidation endpoint.
 *
 * Usage:
 * - Specific page:  https://hilalvisits.com/api/revalidate?secret=YOUR_SECRET&path=/blog/bled
 * - Entire site:    https://hilalvisits.com/api/revalidate?secret=YOUR_SECRET&path=all
 *
 * Automatically purges the R2 incremental cache and Cloudflare cache for the specified path(s),
 * allowing new Prismic content to show up immediately without redeploying.
 */
export async function GET(request: NextRequest) {
	const secret = request.nextUrl.searchParams.get('secret')
	const path = request.nextUrl.searchParams.get('path')

	const expectedSecret = process.env.REVALIDATE_SECRET

	if (!expectedSecret) {
		return NextResponse.json(
			{ message: 'REVALIDATE_SECRET environment variable is not configured on the server' },
			{ status: 500 }
		)
	}

	if (secret !== expectedSecret) {
		return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 })
	}

	try {
		if (path === 'all' || !path) {
			// Invalidate all pages under the root layout
			revalidatePath('/', 'layout')
			return NextResponse.json({
				revalidated: true,
				scope: 'all',
				timestamp: new Date().toISOString()
			})
		}

		const normalizedPath = path.startsWith('/') ? path : `/${path}`
		revalidatePath(normalizedPath)

		// When a blog post changes, also revalidate the blog listing and homepage
		// so card snippets and latest blogs reflect the updates
		if (normalizedPath.startsWith('/blog/')) {
			revalidatePath('/blog')
			revalidatePath('/')
		}

		return NextResponse.json({
			revalidated: true,
			path: normalizedPath,
			timestamp: new Date().toISOString()
		})
	} catch (err) {
		return NextResponse.json(
			{
				message: 'Error revalidating',
				error: err instanceof Error ? err.message : String(err)
			},
			{ status: 500 }
		)
	}
}
