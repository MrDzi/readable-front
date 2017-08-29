import { createSelector } from 'reselect';
import { getPostsFromState, getCurrentCategoryFromState, getPostsIdsByCategoryFromState } from '../reducers';

const getPostsSelectorFunction = (posts) => Object.values(posts);
const getPostsIdsByCategoryFunction = (posts, postsByCategory) => posts.filter(
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
    getPostsIdsByCategoryFromState,
    getPostsIdsByCategoryFunction
);

export const getFilteredPostsSelector = createSelector(
    getPostsSelector,
    getCurrentCategoryFromState,
    getFilteredPostsSelectorFunction
);
