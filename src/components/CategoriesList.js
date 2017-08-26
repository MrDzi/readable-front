import React from 'react';

export default function CategoriesList({ categories }) {
    return (
        <ul>
            {categories.map(category => (
                <li key={category.name}>{category.name}</li>
            ))}
        </ul>
    )
}
