'use client'
import { ReactNode } from 'react'

import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query'

export const DEFAULT_STALE_TIME = 1000 * 60 * 5

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: DEFAULT_STALE_TIME,
			retry: false,
			refetchOnWindowFocus: false
		}
	}
})

export default function QueryClientProvider({ children }: { children: ReactNode }) {
	return <Provider client={queryClient}>{children}</Provider>
}
