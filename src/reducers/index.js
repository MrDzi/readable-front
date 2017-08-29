import { combineReducers } from 'redux';
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, SET_CURRENT_CATEGORY, RECEIVE_POSTS_BY_CATEGORY, RECEIVE_POST } from '../actions';

const categoriesInitialState = {
    categories: [],
    currentCategory: ''
}

function categories(state = categoriesInitialState, action) {
    const { type, categories, currentCategory } = action;
    switch (type) {
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                categories
            };
        case SET_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory
            }
        default:
            return state;
    }
}

function posts(state = {}, action) {
    const { type, posts } = action;
    switch (type) {
        case RECEIVE_POSTS:
            return {...state, ...posts};
        default:
            return state;
    }
}

function postsIdsByCategory(state = [], action) {
    const { type, posts } = action;
    switch (type) {
        case RECEIVE_POSTS_BY_CATEGORY:
            return [...posts];
        default:
            return state;
    }
}

function post(state = {}, action) {
    const { type, post } = action;
    switch (type) {
        case RECEIVE_POST:
            return post;
        default:
            return state;
    }
}

export const getPostsFromState = (state) => state.posts;
export const getPostsIdsByCategoryFromState = (state) => state.postsIdsByCategory;
export const getCurrentCategoryFromState = (state) => state.categories.currentCategory;

export default combineReducers({
    categories,
    posts,
    postsIdsByCategory,
    post
});
