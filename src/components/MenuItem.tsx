import React from 'react';
import type { MenuItem as MenuItemType } from '../api/menuApi';

interface MenuItemProps {
    item: MenuItemType;
    onEdit: (item: MenuItemType) => void;
    onDelete: (id: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onEdit, onDelete }) => {
    return (
        <div className="card menu-item">
            <div className="menu-item-image-container" style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                    src={item.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(255,255,255,0.9)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    color: 'var(--color-primary)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    ${item.price.toFixed(2)}
                </div>
                {!item.isAvailable && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                    }}>
                        Sold Out
                    </div>
                )}
            </div>

            <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-dark)' }}>{item.name}</h3>
                    <span className="badge" style={{ background: '#ecfdf5', color: '#059669' }}>
                        {item.category}
                    </span>
                </div>

                <p style={{ color: 'var(--color-gray)', fontSize: '0.95rem', lineHeight: '1.5', margin: '0 0 1.5rem 0' }}>
                    {item.description}
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                    <button
                        className="btn-outline"
                        onClick={() => onEdit(item)}
                        style={{ flex: 1 }}
                    >
                        Edit
                    </button>
                    <button
                        className="btn-danger" /* Using a class we defined in index.css */
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this item?')) {
                                onDelete(item.id);
                            }
                        }}
                        style={{
                            borderRadius: '8px',
                            border: 'none',
                            padding: '0.6em 1.2em',
                            cursor: 'pointer',
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;
