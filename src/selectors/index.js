import { createSelector } from 'reselect';
import { getPostsFromState, getPostsIdsByCategoryFromState, getCommentsFromState, getPostsSortingOptionFromState } from '../reducers';
import { unNormalize } from '../utils/helpers';

const getPostsIdsByCategoryFunction = (posts, postsByCategory) => posts.filter(
    post => postsByCategory.indexOf(post.id) > -1
);

const getPostsFunction = (posts, postsSortingOption) => (
    unNormalize(posts).sort((a,b) => a[postsSortingOption] < b[postsSortingOption])
);

export const getPostsSelector = createSelector(
    getPostsFromState,
    getPostsSortingOptionFromState,
    getPostsFunction
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
