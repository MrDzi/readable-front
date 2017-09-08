import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, SET_CURRENT_CATEGORY, RECEIVE_POSTS_BY_CATEGORY, RECEIVE_CURRENT_POST, RECEIVE_COMMENTS, SET_POSTS_SORTING_OPTION, RECEIVE_COMMENT, REMOVE_COMMENT, SET_COMMENTS_SORTING_OPTION, CHANGE_POST_SCORE, REMOVE_POST, CHANGE_COMMENT_SCORE, EDIT_COMMENT, SET_EDIT_COMMENT_DRAFT, TOGGLE_EDIT_COMMENT_MODAL, EDIT_POST } from '../actions';

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

const commentsInitialState = {
    comments: {},
    commentsSortingOption: 'voteScore',
    editCommentModalOpened: false,
    editCommentDraft: {}
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
    const { type, posts, currentPost, postId, editPostObj, postsSortingOption, changePostScoreObj } = action;
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
        case CHANGE_POST_SCORE:
            const { voteScore: currentVoteScore } = state.posts[changePostScoreObj.postId]
            const voteScore = changePostScoreObj.option === 'upVote' ? currentVoteScore + 1 :
            currentVoteScore - 1;
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [changePostScoreObj.postId]: {
                        ...state.posts[changePostScoreObj.postId],
                        voteScore
                    }
                }
            }
        case EDIT_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [editPostObj.id]: {
                        ...state.posts[editPostObj.id],
                        ...editPostObj
                    }
                }
            }
        case REMOVE_POST:
            const filteredPosts = Object.keys(state.posts)
                .filter(key => key !== postId)
                .reduce((result, current) => {
                    result[current] = state.posts[current];
                    return result;
                }, {});
            return {
                ...state,
                posts: filteredPosts
            }
        default:
            return state;
    }
}

function comments(state = commentsInitialState, action) {
    const { type, comments, comment, commentId, commentObj, commentsSortingOption, changeCommentScoreObj, editCommentModalOpened, editCommentDraft } = action;
    switch (type) {
        case RECEIVE_COMMENTS:
            return {
                ...state,
                comments
            }
        case RECEIVE_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [comment.id]: comment
                }
            }
        case REMOVE_COMMENT:
            const filteredComments = Object.keys(state.comments)
                .filter(key => key !== commentId)
                .reduce((result, current) => {
                    result[current] = state.comments[current];
                    return result;
                }, {});
            return {
                ...state,
                comments: filteredComments
            }
        case SET_COMMENTS_SORTING_OPTION:
            return {
                ...state,
                commentsSortingOption
            }
        case CHANGE_COMMENT_SCORE:
            const updatedComment = state.comments[changeCommentScoreObj.commentId];
            const { voteScore: currentVoteScore } = updatedComment;
            const voteScore = changeCommentScoreObj.option === 'upVote' ? currentVoteScore + 1 :
            currentVoteScore - 1;
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [changeCommentScoreObj.commentId]: {
                        ...updatedComment,
                        voteScore
                    }
                }
            }
        case EDIT_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [commentObj.id]: {
                        ...state.comments[commentObj.id],
                        ...commentObj
                    }
                }
            }
        case TOGGLE_EDIT_COMMENT_MODAL:
            return {
                ...state,
                editCommentModalOpened
            }
        case SET_EDIT_COMMENT_DRAFT:
            return {
                ...state,
                editCommentDraft
            }
        default:
            return state;
    }
}

export const getPostsFromState = (state) => state.posts.posts;
export const getPostsIdsByCategoryFromState = (state) => state.categories.postsIdsByCategory;
export const getCommentsFromState = (state) => state.comments.comments;
export const getPostsSortingOptionFromState = (state) => state.posts.postsSortingOption;
export const getCommentsSortingOptionFromState = (state) => state.comments.commentsSortingOption;

export default combineReducers({
    categories,
    posts,
    comments,
    form: formReducer
});
