import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoriesList({ categories }) {
    return (
        <ul className="categories-list u-list-reset-styles">
            {categories.map(category => (
                <li className="categories-list__item" key={category.name}>
                    <Link to={`/${category.name}`}>{category.name}</Link>
                </li>
            ))}
        </ul>
    )
}
