import { params, normalize } from './helpers';

const baseUrl = 'http://localhost:5001';

export function fetchCategories() {
    return fetch(`${baseUrl}/categories`, params)
        .then(res => res.json())
        .then(res => res.categories);
}

export function fetchPosts() {
    return fetch(`${baseUrl}/posts`, params)
        .then(res => res.json())
        .then(posts => normalize(posts));
}

export function fetchPostsByCategory(category) {
    console.log(category);
    return fetch(`${baseUrl}/${category}/posts`, params)
        .then(res => res.json());
}
