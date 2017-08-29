import { combineReducers } from 'redux';
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, SET_CURRENT_CATEGORY, RECEIVE_POSTS_BY_CATEGORY } from '../actions';

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

function postsByCategory(state = [], action) {
    const { type, posts } = action;
    switch (type) {
        case RECEIVE_POSTS_BY_CATEGORY:
            return [...posts];
        default:
            return state;
    }
}

export const getPostsFromState = (state) => state.posts;
export const getPostsByCategoryFromState = (state) => state.postsByCategory;
export const getCurrentCategoryFromState = (state) => state.categories.currentCategory;

export default combineReducers({
    categories,
    posts,
    postsByCategory
});
