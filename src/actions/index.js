import { fetchCategories, fetchPosts, fetchPostsByCategory } from '../utils/api';
import { mapToIds } from '../utils/helpers';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';

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
        .then(posts => dispatch(receivePosts(posts)))
);

export const receivePostsByCategory = posts => ({
    type: RECEIVE_POSTS_BY_CATEGORY,
    posts
});

export const getPostsByCategory = (category) => dispatch => (
    fetchPostsByCategory(category)
        .then(posts => {
            dispatch(receivePostsByCategory(mapToIds(posts)));
            dispatch(receivePosts(posts));
        })
);

export const setCurrentCategory = (currentCategory) => ({
    type: SET_CURRENT_CATEGORY,
    currentCategory
});
