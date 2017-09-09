import { createSelector } from 'reselect';
import { getPostsIdsByCategoryFromState } from '../components/categories/reducers';
import { getPostsFromState, getPostsSortingOptionFromState } from '../components/posts/reducers';
import { getCommentsFromState, getCommentsSortingOptionFromState } from '../components/comments/reducers';
import { unNormalize } from '../utils/helpers';

const getPostsIdsByCategoryFunction = (posts, postsByCategory) => posts.filter(
    post => postsByCategory.indexOf(post.id) > -1
);

const getPostsCommentsFunction = (collection, sortingOption) => (
    unNormalize(collection).sort((a,b) => a[sortingOption] < b[sortingOption])
);

export const getPostsSelector = createSelector(
    getPostsFromState,
    getPostsSortingOptionFromState,
    getPostsCommentsFunction
);

export const getPostsByCategorySelector = createSelector(
    getPostsSelector,
    getPostsIdsByCategoryFromState,
    getPostsIdsByCategoryFunction
);

export const getCommentsSelector = createSelector(
    getCommentsFromState,
    getCommentsSortingOptionFromState,
    getPostsCommentsFunction
);
