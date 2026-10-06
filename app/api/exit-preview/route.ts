import { exitPreview } from '@prismicio/next'

/** Ends a Prismic preview session (called by the Prismic toolbar "close" button). */
export async function GET() {
	return await exitPreview()
}
