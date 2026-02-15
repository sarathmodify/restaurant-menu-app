import { useMutation, useQueryClient } from '@tanstack/react-query';
import { menuApi } from '../api/menuApi';
import type { MenuItem } from '../api/menuApi';

/**
 * Custom hook for updating existing menu items
 * Supports optimistic updates for better UX
 */
export const useUpdateMenu = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<MenuItem> }) =>
            menuApi.updateMenuItem(id, data),

        // Optimistic update
        onMutate: async ({ id, data }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['menu'] });

            // Snapshot previous value
            const previousMenu = queryClient.getQueryData(['menu']);

            // Optimistically update cache
            queryClient.setQueryData(['menu'], (old: MenuItem[] | undefined) => {
                if (!old) return old;
                return old.map(item =>
                    item.id === id ? { ...item, ...data } : item
                );
            });

            return { previousMenu };
        },

        onError: (error, _variables, context) => {
            // Rollback on error
            if (context?.previousMenu) {
                queryClient.setQueryData(['menu'], context.previousMenu);
            }
            console.error('Failed to update menu item:', error);
        },

        onSettled: () => {
            // Always refetch after error or success
            queryClient.invalidateQueries({ queryKey: ['menu'] });
        },
    });
};
