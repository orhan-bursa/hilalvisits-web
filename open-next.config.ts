import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache'
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue'

/**
 * ISR setup:
 * - R2 stores the rendered pages + fetch cache (binding: NEXT_INC_CACHE_R2_BUCKET).
 * - Regional cache (Cache API) keeps hot entries close to the visitor to cut R2 reads / TTFB.
 * - Durable Object queue handles background revalidation once an entry is stale
 *   (binding: NEXT_CACHE_DO_QUEUE).
 *
 * No tag cache is configured because we only use time-based revalidation
 * (no revalidateTag / revalidatePath).
 */
export default defineCloudflareConfig({
	incrementalCache: withRegionalCache(r2IncrementalCache, { mode: 'long-lived' }),
	queue: doQueue
})
