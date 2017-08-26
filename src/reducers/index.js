import { combineReducers } from 'redux';
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, SET_CURRENT_CATEGORY } from '../actions';

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
    switch (action.type) {
        case RECEIVE_POSTS:
            return {...state, ...action.posts};
        default:
            return state;
    }
}

export const getPostsFromState = (state) => state.posts;
export const getCurrentCategory = (state) => state.categories.currentCategory;

export default combineReducers({
    categories,
    posts
});
