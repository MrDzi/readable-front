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
            let promiseList = [];
            for (let post of posts) {
                promiseList.push(
                    fetch(`${baseUrl}/posts/${post.id}/comments`, params)
                        .then(res => res.json())
                        .then(res => {
                            post.commentsCount = res.length;
                            return post;
                        })
                )
            }
            return Promise.all(promiseList).then(posts => posts);
        });
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
    const payload = { option };
    return fetch(`${baseUrl}/posts/${postId}`, {...params, method: 'POST', body: JSON.stringify(payload)})
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
    const payload = { option };
    return fetch(`${baseUrl}/comments/${commentId}`, {...params, method: 'POST', body: JSON.stringify(payload)})
        .then(res => {
            console.log('comment score api');
        });
}

export function apiEditPost(editPostObj) {
    const { postId, title, body } = editPostObj;
    const payload = { title, body };
    return fetch(`${baseUrl}/posts/${postId}`, {...params, method: 'PUT', body: JSON.stringify(payload)})
        .then(res => {
            console.log('edit comment');
        })
}
