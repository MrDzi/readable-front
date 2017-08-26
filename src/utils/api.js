import { params } from './helpers';

const baseUrl = 'http://localhost:5001';

export function fetchCategories() {
    return fetch(`${baseUrl}/categories`, params)
        .then(res => res.json())
        .then(res => res.categories);
}

export function fetchPosts() {
    return fetch(`${baseUrl}/posts`, params)
        .then(res => res.json())
        .then(posts => {
            let normalizedPosts = {};
            posts.forEach(post => {
                normalizedPosts[post.id] = post;
            });
            return normalizedPosts;
        })
}
