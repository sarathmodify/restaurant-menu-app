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
    filterMenuItems: async (filters: { category?: string; search?: string }): Promise<MenuItem[]> => {
        const params: Record<string, string> = {};

        if (filters.category) {
            params.category = filters.category;
        }

        if (filters.search) {
            params.q = filters.search; // JSON Server uses 'q' for full-text search
        }

        const { data } = await axiosInstance.get('/menu', { params });
        return data;
    },
};
