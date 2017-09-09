import { fetchCategories, fetchPosts, fetchPostsByCategory, fetchPost, fetchComments, apiAddPost, apiAddComment, apiDeleteComment, apiUpdatePostScore, apiDeletePost , apiUpdateCommentScore, apiEditPost, apiEditComment } from '../utils/api';
import { mapToIds, normalize, filterDeleted } from '../utils/helpers';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const RECEIVE_CURRENT_POST = 'RECEIVE_CURRENT_POST';
export const SET_CURRENT_POST = 'SET_CURRENT_POST';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const SET_POSTS_SORTING_OPTION = 'SET_POSTS_SORTING_OPTION';
export const SET_COMMENTS_SORTING_OPTION = 'SET_COMMENTS_SORTING_OPTION';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const CHANGE_POST_SCORE = 'CHANGE_POST_SCORE';
export const REMOVE_POST = 'REMOVE_POST';
export const CHANGE_COMMENT_SCORE = 'CHANGE_COMMENT_SCORE';
export const EDIT_POST = 'EDIT_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const TOGGLE_EDIT_COMMENT_MODAL = 'TOGGLE_EDIT_COMMENT_MODAL';
export const SET_EDIT_COMMENT_DRAFT = 'SET_EDIT_COMMENT_DRAFT';
export const SET_CONFIRM_MODAL = 'SET_CONFIRM_MODAL';

export const setConfirmModal = confirmModal => ({
    type: SET_CONFIRM_MODAL,
    confirmModal
});

/*** Categories ***/
export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
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

/*** Posts ***/
export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const getPosts = () => dispatch => (
    fetchPosts()
        .then(posts => dispatch(receivePosts(normalize(filterDeleted(posts)))))
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

export const receiveCurrentPost = currentPost => ({
    type: RECEIVE_CURRENT_POST,
    currentPost
});

export const setCurrentPost = postId => (dispatch, getState) => {
    const { posts } = getState();
    return posts.posts[postId] ? dispatch(receiveCurrentPost(posts.posts[postId])) : fetchPost(postId)
        .then(post => dispatch(receiveCurrentPost(post)));
};

export const setPostsSortingOption = postsSortingOption => ({
    type: SET_POSTS_SORTING_OPTION,
    postsSortingOption
});

export const addPost = postObj => dispatch => {
    return apiAddPost(postObj)
        .then(postObj => {
            console.log('action', postObj);
        })
};

export const updatePostScore = changePostScoreObj => dispatch => {
    return apiUpdatePostScore(changePostScoreObj)
        .then(() => dispatch(changePostScore(changePostScoreObj)));
}

const changePostScore = changePostScoreObj => ({
    type: CHANGE_POST_SCORE,
    changePostScoreObj
});

export const deletePost = postId => dispatch => {
    return apiDeletePost(postId)
        .then(() => dispatch(removePost(postId)));
}

const removePost = postId => ({
    type: REMOVE_POST,
    postId
});

export const editPost = editPostObj => dispatch => {
    return apiEditPost(editPostObj)
        .then(res => dispatch(editExistingPost(editPostObj)));
};

const editExistingPost = editPostObj => ({
    type: EDIT_POST,
    editPostObj
});

/*** Comments ***/
const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

export const getComments = postId => dispatch => {
    fetchComments(postId)
        .then(comments => dispatch(receiveComments(normalize(filterDeleted(comments)))));
};

export const addComment = commentObj => dispatch => {
    return apiAddComment(commentObj)
        .then(res => dispatch(receiveComment(commentObj)));
};

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

export const deleteComment = commentId => dispatch => {
    return apiDeleteComment(commentId)
        .then(res => dispatch(removeComment(commentId)))
}

const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId
});

export const setCommentsSortingOption = commentsSortingOption => ({
    type: SET_COMMENTS_SORTING_OPTION,
    commentsSortingOption
});

export const updateCommentScore = changeCommentScoreObj => dispatch => {
    return apiUpdateCommentScore(changeCommentScoreObj)
        .then(() => dispatch(changeCommentScore(changeCommentScoreObj)));
}

const changeCommentScore = changeCommentScoreObj => ({
    type: CHANGE_COMMENT_SCORE,
    changeCommentScoreObj
});

export const editComment = commentObj => dispatch => {
    return apiEditComment(commentObj)
        .then(() => dispatch(editExistingComment(commentObj)));
}

const editExistingComment = commentObj => ({
    type: EDIT_COMMENT,
    commentObj
});

export const toggleEditCommentModal = editCommentModalOpened => ({
    type: TOGGLE_EDIT_COMMENT_MODAL,
    editCommentModalOpened
});

export const setEditCommentDraft = editCommentDraft => ({
    type: SET_EDIT_COMMENT_DRAFT,
    editCommentDraft
});
