import React, { useState } from 'react';
import MenuList from '../components/MenuList';
import FilterBar from '../components/FilterBar';
import AddMenuForm from '../components/AddMenuForm';
import { useMenu } from '../hooks/useMenu';
import { useAddMenu } from '../hooks/useAddMenu';
import { useUpdateMenu } from '../hooks/useUpdateMenu';
import { useDeleteMenu } from '../hooks/useDeleteMenu';
import type { MenuItem, NewMenuItem } from '../api/menuApi';

const CATEGORIES = ['Pizza', 'Salads', 'Main Course', 'Desserts', 'Pasta', 'Burgers', 'Soup', 'Drinks'];

const Home: React.FC = () => {
    // State for filters
    const [activeCategory, setActiveCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

    // Hooks
    const { data: menuItems, isLoading, isError } = useMenu({
        category: activeCategory,
        search: searchQuery
    });

    const addMutation = useAddMenu();
    const updateMutation = useUpdateMenu();
    const deleteMutation = useDeleteMenu();

    // Handlers
    const handleAddClick = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (item: MenuItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        deleteMutation.mutate(id);
    };

    const handleFormSubmit = (formData: NewMenuItem) => {
        if (editingItem) {
            updateMutation.mutate(
                { id: editingItem.id, data: formData },
                {
                    onSuccess: () => setIsModalOpen(false)
                }
            );
        } else {
            addMutation.mutate(formData, {
                onSuccess: () => setIsModalOpen(false)
            });
        }
    };

    const isSubmitting = addMutation.isPending || updateMutation.isPending;

    return (
        <div className="container fade-in" style={{ paddingBottom: '4rem' }}>
            {/* Header */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                marginTop: '2rem'
            }}>
                <div>
                    <h1 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '2.5rem' }}>Gourmet Haven</h1>
                    <p style={{ margin: '0.5rem 0 0', color: 'var(--color-gray)' }}>Manage your restaurant's delicious offerings</p>
                </div>
                <button
                    className="btn-primary"
                    onClick={handleAddClick}
                    style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>+</span> Add New Item
                </button>
            </header>

            {/* Filters */}
            <FilterBar
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                onSearchChange={setSearchQuery}
            />

            {/* Menu Grid */}
            <MenuList
                items={menuItems}
                isLoading={isLoading}
                isError={isError}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <AddMenuForm
                    key={editingItem ? editingItem.id : 'new'}
                    onSubmit={handleFormSubmit}
                    initialData={editingItem}
                    onCancel={() => setIsModalOpen(false)}
                    isSubmitting={isSubmitting}
                />
            )}
        </div>
    );
};

export default Home;
