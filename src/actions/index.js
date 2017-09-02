import { fetchCategories, fetchPosts, fetchPostsByCategory, fetchPost, fetchComments } from '../utils/api';
import { mapToIds, normalize } from '../utils/helpers';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const RECEIVE_CURRENT_POST = 'RECEIVE_CURRENT_POST';
export const SET_CURRENT_POST = 'SET_CURRENT_POST';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const SET_POSTS_SORTING_OPTION = 'SET_POSTS_SORTING_OPTION';
export const SET_COMMENTS_SORTING_OPTION = 'SET_COMMENTS_SORTING_OPTION';

/*** Categories ***/
export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

export const getCategories = () => dispatch => (
    fetchCategories()
        .then(categories => dispatch(receiveCategories(categories)))
);

export const setCurrentCategory = currentCategory => ({
    type: SET_CURRENT_CATEGORY,
    currentCategory
});

/*** Posts ***/
export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const getPosts = () => dispatch => (
    fetchPosts()
        .then(posts => dispatch(receivePosts(normalize(posts))))
);

const receivePostsByCategory = postsIdsByCategory => ({
    type: RECEIVE_POSTS_BY_CATEGORY,
    postsIdsByCategory
});

export const getPostsByCategory = category => dispatch => (
    fetchPostsByCategory(category)
        .then(posts => {
            dispatch(receivePostsByCategory(mapToIds(posts)));
            dispatch(receivePosts(normalize(posts)));
        })
);

const receiveCurrentPost = currentPost => ({
    type: RECEIVE_CURRENT_POST,
    currentPost
});

export const getCurrentPost = postId => (dispatch, getState) => {
    const { posts } = getState();
    return posts[postId] ? dispatch(receiveCurrentPost(posts[postId])) : fetchPost(postId)
        .then(post => dispatch(receiveCurrentPost(post)));
};

export const setPostsSortingOption = postsSortingOption => ({
    type: SET_POSTS_SORTING_OPTION,
    postsSortingOption
});

export const setCommentsSortingOption = commentsSortingOption => ({
    type: SET_COMMENTS_SORTING_OPTION,
    commentsSortingOption
});

/*** Comments ***/
const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

export const getComments = postId => dispatch => {
    fetchComments(postId)
        .then(comments => dispatch(receiveComments(normalize(comments))));
};
