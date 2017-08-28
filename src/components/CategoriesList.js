import React from 'react';

export default function CategoriesList({ categories, goToCategory }) {
    return (
        <ul>
            {categories.map(category => (
                <li key={category.name} onClick={() => goToCategory(category.name)}>{category.name}</li>
            ))}
        </ul>
    )
}
