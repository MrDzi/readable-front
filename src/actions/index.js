import { fetchCategories, fetchPosts, fetchPostsByCategory, fetchPost } from '../utils/api';
import { mapToIds, normalize } from '../utils/helpers';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const RECEIVE_POST = 'RECEIVE_POST';
export const SET_CURRENT_POST = 'SET_CURRENT_POST';

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

export const getCategories = () => dispatch => (
    fetchCategories()
        .then(categories => dispatch(receiveCategories(categories)))
);

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const getPosts = () => dispatch => (
    fetchPosts()
        .then(posts => dispatch(receivePosts(normalize(posts))))
);

const receivePostsByCategory = posts => ({
    type: RECEIVE_POSTS_BY_CATEGORY,
    posts
});

export const getPostsByCategory = (category) => dispatch => (
    fetchPostsByCategory(category)
        .then(posts => {
            dispatch(receivePostsByCategory(mapToIds(posts)));
            dispatch(receivePosts(normalize(posts)));
        })
);

export const setCurrentCategory = (currentCategory) => ({
    type: SET_CURRENT_CATEGORY,
    currentCategory
});

const receivePost = post => ({
    type: RECEIVE_POST,
    post
});

export const getPost = (postId) => (dispatch, getState) => {
    const { posts } = getState();
    return posts[postId] ? dispatch(receivePost(posts[postId])) : fetchPost(postId)
        .then(post => dispatch(receivePost(post)));
};

export const setCurrentPost = (currentPostId) => ({
    type: SET_CURRENT_POST,
    currentPostId
});
