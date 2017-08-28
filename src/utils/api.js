import { params } from './helpers';

const baseUrl = 'http://localhost:5001';

function normalize(collection) {
    let normalizedData = {};
    collection.forEach(item => {
        normalizedData[item.id] = item;
    });
    return normalizedData;
}

function mapToIds(collection) {
    return collection.map(item => item.id);
}

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
        .then(res => res.json())
        .then(posts => mapToIds(posts));
}
