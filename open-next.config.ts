import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache'
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue'
import doShardedTagCache from '@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache'

/**
 * ISR setup:
 * - R2 stores the rendered pages + fetch cache (binding: NEXT_INC_CACHE_R2_BUCKET).
 * - Regional cache (Cache API) keeps hot entries close to the visitor to cut R2 reads / TTFB.
 * - Durable Object queue handles background revalidation once an entry is stale
 *   (binding: NEXT_CACHE_DO_QUEUE).
 * - Durable Object tag cache records on-demand invalidations, so `revalidatePath()` in
 *   /api/revalidate actually marks pages stale (binding: NEXT_TAG_CACHE_DO_SHARDED).
 *   Without a tag cache OpenNext falls back to a no-op and revalidatePath does nothing.
 */
export default defineCloudflareConfig({
	incrementalCache: withRegionalCache(r2IncrementalCache, { mode: 'long-lived' }),
	queue: doQueue,
	// Small site, low traffic: a few shards are plenty.
	tagCache: doShardedTagCache({ baseShardSize: 4 })
})
