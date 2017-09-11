import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import CommentsList from '../comments/CommentsList';
import CommentsForm from '../comments/CommentsForm';
import SortSelect from '../shared/SortSelect';
import VoteScoreControls from '../shared/VoteScoreControls';
import ConfirmModal from '../shared/ConfirmModal';
import { setConfirmModal } from '../../Actions';
import { getCommentsSelector } from '../../selectors';
import { setCurrentPost, updatePostScore, deletePost } from './actions';
import { getComments, addComment } from '../comments/actions';
import { generateId } from '../../utils/helpers';

class Post extends Component {
    constructor(props) {
        super(props);
        this.postId = this.props.match.params.postId;
    }
    componentWillMount() {
        this.props.setCurrentPost(this.postId);
        this.props.getComments(this.postId);
    }
    handleCommentSubmit = values => {
        const id = generateId(),
              timestamp = Date.now(),
              voteScore = 1;
        this.props.addComment({...values, id, timestamp, voteScore, parentId: this.postId});
    }
    handlePostVoteScoreChange = option => {
        this.props.updatePostScore({postId: this.postId, option})
    }
    handleDeletePost = () => {
        this.props.deletePost(this.postId);
        this.props.setConfirmModal({
            isPostModalOpen: false,
            id: ''
        });
        this.props.history.push("/");
    }
    render() {
        return (
            <div>
                <h3>{this.props.currentPost.title}</h3>
                <div>
                    <VoteScoreControls handleVoteScoreChange={this.handlePostVoteScoreChange} />
                    <span onClick={() => this.props.setConfirmModal({isPostModalOpen: true, id: this.postId})}>Delete</span>
                </div>
                <div>{this.props.currentPost.body}</div>
                <div>Score: {this.props.currentPost.voteScore}</div>
                <Link to={`/post-edit/${this.postId}`}>Edit</Link>
                <SortSelect target="comments" />
                <CommentsList comments={this.props.comments} />
                <CommentsForm form="create-comment" type="create" handleCommentSubmit={this.handleCommentSubmit} />
                <ConfirmModal
                    handleSubmit={this.handleDeletePost}
                    isOpen={this.props.confirmModal.isPostModalOpen}
                    action="delete this post"
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentPost: state.posts.currentPost,
        comments: getCommentsSelector(state),
        confirmModal: state.confirmModal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentPost: postId => dispatch(setCurrentPost(postId)),
        getComments: postId => dispatch(getComments(postId)),
        addComment: commentObj => dispatch(addComment(commentObj)),
        updatePostScore: changeScorePostObj => dispatch(updatePostScore(changeScorePostObj)),
        deletePost: postId => dispatch(deletePost(postId)),
        setConfirmModal: confirmModal => dispatch(setConfirmModal(confirmModal))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
