import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

export const getQueryClient = cache(() => new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false, // retry on error?
      staleTime: 300000,
      cacheTime: 300000,
    },
  },
  // queryCache: {},
}));