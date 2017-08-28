import { createSelector } from 'reselect';
import { getPostsFromState, getCurrentCategoryFromState, getPostsByCategoryFromState } from '../reducers';

const getPostsSelectorFunction = (posts) => Object.values(posts);
const getPostsByCategoryFunction = (posts, postsByCategory) => posts.filter(
    post => postsByCategory.indexOf(post.id) > -1
);
const getFilteredPostsSelectorFunction = (posts, category) => posts.filter(
    post => post.category === category
);

export const getPostsSelector = createSelector(
    getPostsFromState,
    getPostsSelectorFunction
);

export const getPostsByCategorySelector = createSelector(
    getPostsSelector,
    getPostsByCategoryFromState,
    getPostsByCategoryFunction
);

export const getFilteredPostsSelector = createSelector(
    getPostsSelector,
    getCurrentCategoryFromState,
    getFilteredPostsSelectorFunction
);
