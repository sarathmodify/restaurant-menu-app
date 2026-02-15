import React from 'react';
import MenuItem from './MenuItem';
import type { MenuItem as MenuItemType } from '../api/menuApi';

interface MenuListProps {
    items: MenuItemType[] | undefined;
    isLoading: boolean;
    isError: boolean;
    onEdit: (item: MenuItemType) => void;
    onDelete: (id: string) => void;
}

const MenuList: React.FC<MenuListProps> = ({ items, isLoading, isError, onEdit, onDelete }) => {
    if (isLoading) {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="card" style={{ height: '400px', animation: 'pulse 1.5s infinite' }}>
                        <div style={{ height: '200px', background: '#e2e8f0' }} />
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ height: '24px', width: '60%', background: '#e2e8f0', marginBottom: '1rem' }} />
                            <div style={{ height: '16px', background: '#e2e8f0', marginBottom: '0.5rem' }} />
                            <div style={{ height: '16px', width: '80%', background: '#e2e8f0' }} />
                        </div>
                    </div>
                ))}
                <style>{`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}</style>
            </div>
        );
    }

    if (isError) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-danger)' }}>
                <h2>Oops! Something went wrong.</h2>
                <p>Failed to load menu items. Please try again later.</p>
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-gray)' }}>
                <h2>No items found</h2>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
            </div>
        );
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
        }}>
            {items.map((item) => (
                <MenuItem
                    key={item.id}
                    item={item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default MenuList;
