import React, { useState } from 'react';
import type { MenuItem, NewMenuItem } from '../api/menuApi';

interface AddMenuFormProps {
    onSubmit: (item: NewMenuItem) => void;
    initialData?: MenuItem | null;
    onCancel: () => void;
    isSubmitting: boolean;
}

const CATEGORIES = ['Pizza', 'Salads', 'Main Course', 'Desserts', 'Pasta', 'Burgers', 'Soup', 'Drinks'];

const AddMenuForm = ({ onSubmit, initialData, onCancel, isSubmitting }: AddMenuFormProps) => {
    // Initialize state from props - relies on parent key prop to reset when switching items
    const [formData, setFormData] = useState<NewMenuItem>(() => {
        if (initialData) {
            return {
                name: initialData.name,
                description: initialData.description,
                price: initialData.price,
                category: initialData.category,
                image: initialData.image || '',
                isAvailable: initialData.isAvailable
            };
        }
        return {
            name: '',
            description: '',
            price: 0,
            category: 'Main Course',
            image: '',
            isAvailable: true
        };
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : name === 'price' ? parseFloat(value) : value
        }));
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div className="card" style={{
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2rem'
            }}>
                <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>
                    {initialData ? 'Edit Menu Item' : 'Add New Item'}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Item Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="input-field"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Truffle Pasta"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Description</label>
                        <textarea
                            name="description"
                            required
                            className="input-field"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Brief description of the dish..."
                            style={{ resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                required
                                min="0"
                                step="0.01"
                                className="input-field"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Category</label>
                            <select
                                name="category"
                                className="input-field"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Image URL</label>
                        <input
                            type="url"
                            name="image"
                            className="input-field"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
                        <input
                            type="checkbox"
                            name="isAvailable"
                            id="isAvailable"
                            checked={formData.isAvailable}
                            onChange={handleChange}
                            style={{ width: '1.2rem', height: '1.2rem' }}
                        />
                        <label htmlFor="isAvailable" style={{ cursor: 'pointer' }}>Available for order</label>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={onCancel}
                            style={{ flex: 1, backgroundColor: '#f3f4f6', color: 'var(--color-dark)', border: 'none' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ flex: 1 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : (initialData ? 'Update Item' : 'Add Item')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMenuForm;
