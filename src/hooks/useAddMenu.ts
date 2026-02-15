import { useMutation, useQueryClient } from '@tanstack/react-query';
import { menuApi } from '../api/menuApi';
import type { NewMenuItem } from '../api/menuApi';

/**
 * Custom hook for adding new menu items
 * Automatically invalidates and refetches menu cache on success
 */
export const useAddMenu = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (menuItem: NewMenuItem) => menuApi.addMenuItem(menuItem),
        onSuccess: () => {
            // Invalidate all menu queries to trigger refetch
            queryClient.invalidateQueries({ queryKey: ['menu'] });
        },
        onError: (error) => {
            console.error('Failed to add menu item:', error);
        },
    });
};
