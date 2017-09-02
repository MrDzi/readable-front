import { combineReducers } from 'redux';
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, SET_CURRENT_CATEGORY, RECEIVE_POSTS_BY_CATEGORY, RECEIVE_CURRENT_POST, RECEIVE_COMMENTS, SET_POSTS_SORTING_OPTION } from '../actions';

const categoriesInitialState = {
    categories: [],
    currentCategory: '',
    postsIdsByCategory: []
}

const postsInitialState = {
    posts: {},
    currentPost: {},
    postsSortingOption: 'voteScore'
}

function categories(state = categoriesInitialState, action) {
    const { type, categories, currentCategory, postsIdsByCategory } = action;
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
        case RECEIVE_POSTS_BY_CATEGORY:
            return {
                ...state,
                postsIdsByCategory
            }
        default:
            return state;
    }
}

function posts(state = postsInitialState, action) {
    const { type, posts, currentPost, postsSortingOption } = action;
    switch (type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                posts
            };
        case RECEIVE_CURRENT_POST:
            return {
                ...state,
                currentPost
            };
        case SET_POSTS_SORTING_OPTION:
            return {
                ...state,
                postsSortingOption
            }
        default:
            return state;
    }
}

function comments(state = {}, action) {
    const { type, comments } = action;
    switch (type) {
        case RECEIVE_COMMENTS:
            return {
                ...state,
                ...comments
            }
        default:
            return state;
    }
}

export const getPostsFromState = (state) => state.posts.posts;
export const getPostsIdsByCategoryFromState = (state) => state.categories.postsIdsByCategory;
export const getCommentsFromState = (state) => state.comments;
export const getPostsSortingOptionFromState = (state) => state.posts.postsSortingOption;

export default combineReducers({
    categories,
    posts,
    comments
});
