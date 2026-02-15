import { useQuery } from '@tanstack/react-query';
import { menuApi } from '../api/menuApi';

interface UseMenuFilters {
    category?: string;
    search?: string;
}

/**
 * Custom hook for fetching menu items with optional filters
 * Uses TanStack Query for caching and automatic refetching
 */
export const useMenu = (filters?: UseMenuFilters) => {
    return useQuery({
        queryKey: ['menu', filters],
        queryFn: () => {
            if (filters && (filters.category || filters.search)) {
                return menuApi.filterMenuItems(filters);
            }
            return menuApi.fetchMenuItems();
        },
        staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
        gcTime: 10 * 60 * 1000, // Cache for 10 minutes (formerly cacheTime)
    });
};
