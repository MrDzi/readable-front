import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoriesList({ categories, goToCategory }) {
    return (
        <ul>
            {categories.map(category => (
                <li key={category.name}>
                    <Link to={`/${category.name}`}>{category.name}</Link>
                </li>
            ))}
        </ul>
    )
}
