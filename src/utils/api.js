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

export function fetchComments(postId) {
    return fetch(`${baseUrl}/posts/${postId}/comments`, params)
        .then(res => res.json());
}

export function apiAddPost(postObj) {
    return fetch(`${baseUrl}/posts`, { ...params, method: 'POST', body: JSON.stringify(postObj)})
        .then(res => {
            console.log('add post api', res);
        });
}

export function apiAddComment(commentObj) {
    return fetch(`${baseUrl}/comments`, { ...params, method: 'POST', body: JSON.stringify(commentObj)})
        .then(res => {
            console.log('add comment api', res);
        });
}

export function apiDeleteComment(commentId) {
    return fetch(`${baseUrl}/comments/${commentId}`, {...params, method: 'DELETE'})
        .then(res => {
            console.log('delete comment');
        })
}

export function apiUpdatePostScore(changePostScoreObj) {
    const { postId, option } = changePostScoreObj;
    const body = { option };
    return fetch(`${baseUrl}/posts/${postId}`, {...params, method: 'POST', body: JSON.stringify(body)})
        .then(res => {
            console.log('post score api');
        });
}

export function apiDeletePost(postId) {
    return fetch(`${baseUrl}/posts/${postId}`, {...params, method: 'DELETE'})
        .then(res => {
            console.log('delete comment');
        })
}

export function apiUpdateCommentScore(changeCommentScoreObj) {
    const { commentId, option } = changeCommentScoreObj;
    const body = { option };
    return fetch(`${baseUrl}/comments/${commentId}`, {...params, method: 'POST', body: JSON.stringify(body)})
        .then(res => {
            console.log('comment score api');
        });
}
