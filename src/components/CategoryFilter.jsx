import React from 'react';

const formatCategoryLabel = category => {
    const labels = {
        all: 'All',
        data: 'Data',
        leadership: 'Leadership',
        systems: 'Systems',
        building: 'Building',
        projects: 'Projects',
        life: 'Life',
        notes: 'Notes',
        other: 'Other',
    };

    return labels[category] || category;
};

const CategoryFilter = ({
    categories,
    selectedCategory,
    onSelectCategory,
}) => {
    const allOptions = ['all', ...categories];

    return (
        <div className="flex flex-wrap gap-2">
            {allOptions.map(category => {
                const isActive = selectedCategory === category;

                return (
                    <button
                        key={category}
                        type="button"
                        onClick={() => onSelectCategory(category)}
                        className={[
                            'inline-flex items-center justify-center rounded-pill px-4 py-2 text-[0.92rem] font-semibold tracking-[-0.01em] transition-all duration-200',
                            isActive
                                ? 'bg-site-text text-site-bg shadow-soft'
                                : 'border border-site-border bg-site-bg text-site-text hover:-translate-y-[1px] hover:bg-white',
                        ].join(' ')}
                    >
                        {formatCategoryLabel(category)}
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryFilter;