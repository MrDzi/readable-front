import { createSelector } from 'reselect';
import { getPostsFromState, getPostsIdsByCategoryFromState, getCommentsFromState } from '../reducers';
import { unNormalize } from '../utils/helpers';

const getPostsIdsByCategoryFunction = (posts, postsByCategory) => posts.filter(
    post => postsByCategory.indexOf(post.id) > -1
);
// const getFilteredPostsSelectorFunction = (posts, category) => posts.filter(
//     post => post.category === category
// );

export const getPostsSelector = createSelector(
    getPostsFromState,
    unNormalize
);

export const getPostsByCategorySelector = createSelector(
    getPostsSelector,
    getPostsIdsByCategoryFromState,
    getPostsIdsByCategoryFunction
);

export const getCommentsSelector = createSelector(
    getCommentsFromState,
    unNormalize
);
