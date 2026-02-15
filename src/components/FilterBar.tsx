import React, { useState } from 'react';

interface FilterBarProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    onSearchChange: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
    onSearchChange
}) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearchChange(value);
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                background: 'var(--color-white)',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-sm)'
            }}>
                {/* Search Input */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search our menu..."
                        className="input-field"
                        value={searchValue}
                        onChange={handleSearch}
                        style={{ paddingLeft: '2.5rem' }}
                    />
                    <span style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#9ca3af'
                    }}>
                        🔍
                    </span>
                </div>

                {/* Category Filters */}
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    overflowX: 'auto',
                    paddingBottom: '0.5rem',
                    scrollbarWidth: 'none' /* Firefox */
                }}>
                    <button
                        onClick={() => onCategoryChange('')}
                        style={{
                            backgroundColor: activeCategory === '' ? 'var(--color-dark)' : '#f3f4f6',
                            color: activeCategory === '' ? 'white' : 'var(--color-gray)',
                            border: 'none',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        All Items
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            style={{
                                backgroundColor: activeCategory === category ? 'var(--color-primary)' : '#f3f4f6',
                                color: activeCategory === category ? 'white' : 'var(--color-gray)',
                                border: 'none',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
