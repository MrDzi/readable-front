import { params } from './helpers';

const baseUrl = 'http://localhost:5001';

export function fetchCategories() {
    return fetch(`${baseUrl}/categories`, params)
        .then(res => res.json())
        .then(res => res.categories);
}

export function fetchPosts() {
    return fetch(`${baseUrl}/posts`, params)
        .then(res => res.json());
}

export function fetchPostsByCategory(category) {
    return fetch(`${baseUrl}/${category}/posts`, params)
        .then(res => res.json());
}

export function fetchPost(postId) {
    return fetch(`${baseUrl}/posts/${postId}`, params)
        .then(res => res.json());
}
