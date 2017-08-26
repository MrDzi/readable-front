import { createSelector } from 'reselect';
import { getPostsFromState, getCurrentCategory } from '../reducers';

const getPostsSelectorFunction = (posts) => Object.values(posts);
const getFilteredPostsSelectorFunction = (posts, category) => posts.filter(
    post => post.category === category
);

export const getPostsSelector = createSelector(
    getPostsFromState,
    getPostsSelectorFunction
);

export const getFilteredPostsSelector = createSelector(
    getPostsSelector,
    getCurrentCategory,
    getFilteredPostsSelectorFunction
);
