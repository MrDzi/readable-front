import { fetchCategories, fetchPostsByCategory } from '../../../utils/api';
import { mapToIds, normalize, filterDeleted } from '../../../utils/helpers';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY';

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

const receivePostsByCategory = postsIdsByCategory => ({
    type: RECEIVE_POSTS_BY_CATEGORY,
    postsIdsByCategory
});

export const getCategories = () => (dispatch, getState) => {
    const state = getState();
    return state.categories && state.categories.categories.length ? state.categories.categories : fetchCategories()
        .then(categories => dispatch(receiveCategories(categories)))
};

export const setCurrentCategory = currentCategory => ({
    type: SET_CURRENT_CATEGORY,
    currentCategory
});
