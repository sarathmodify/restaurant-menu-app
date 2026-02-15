import { useMutation, useQueryClient } from '@tanstack/react-query';
import { menuApi } from '../api/menuApi';
import type { MenuItem } from '../api/menuApi';

/**
 * Custom hook for deleting menu items
 * Includes optimistic updates for immediate UI feedback
 */
export const useDeleteMenu = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => menuApi.deleteMenuItem(id),

        // Optimistic update
        onMutate: async (id) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['menu'] });

            // Snapshot previous value
            const previousMenu = queryClient.getQueryData(['menu']);

            // Optimistically remove from cache
            queryClient.setQueryData(['menu'], (old: MenuItem[] | undefined) => {
                if (!old) return old;
                return old.filter(item => item.id !== id);
            });

            return { previousMenu };
        },

        onError: (error, _variables, context) => {
            // Rollback on error
            if (context?.previousMenu) {
                queryClient.setQueryData(['menu'], context.previousMenu);
            }
            console.error('Failed to delete menu item:', error);
        },

        onSettled: () => {
            // Always refetch after error or success
            queryClient.invalidateQueries({ queryKey: ['menu'] });
        },
    });
};
