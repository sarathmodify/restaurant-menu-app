import axiosInstance from '../services/axiosInstance';

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    isAvailable: boolean;
}

export type NewMenuItem = Omit<MenuItem, 'id'>;

export const menuApi = {
    // GET all menu items
    fetchMenuItems: async (): Promise<MenuItem[]> => {
        const { data } = await axiosInstance.get('/menu');
        return data;
    },

    // GET single menu item by ID
    fetchMenuItemById: async (id: string): Promise<MenuItem> => {
        const { data } = await axiosInstance.get(`/menu/${id}`);
        return data;
    },

    // POST new menu item
    addMenuItem: async (menuItem: NewMenuItem): Promise<MenuItem> => {
        const { data } = await axiosInstance.post('/menu', menuItem);
        return data;
    },

    // PUT update entire menu item
    updateMenuItem: async (id: string, menuItem: Partial<MenuItem>): Promise<MenuItem> => {
        const { data } = await axiosInstance.put(`/menu/${id}`, menuItem);
        return data;
    },

    // DELETE menu item
    deleteMenuItem: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/menu/${id}`);
    },

    // GET menu items with filters
    // Note: JSON Server v1.0 doesn't support full-text search with 'q'
    // We need to do client-side filtering for search
    filterMenuItems: async (filters: { category?: string; search?: string }): Promise<MenuItem[]> => {
        const params: Record<string, string> = {};

        // Only add category param if it has a non-empty value
        if (filters.category && filters.category.trim() !== '') {
            params.category = filters.category.trim();
        }

        // Fetch all items (or filtered by category)
        const { data } = await axiosInstance.get('/menu', { params });

        // If there's a search query, filter client-side
        if (filters.search && filters.search.trim() !== '') {
            const searchLower = filters.search.trim().toLowerCase();
            return data.filter((item: MenuItem) =>
                item.name.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower) ||
                item.category.toLowerCase().includes(searchLower)
            );
        }

        return data;
    },
};
