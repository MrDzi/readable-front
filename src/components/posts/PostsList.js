import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import VoteScoreControls from '../shared/VoteScoreControls';
import ConfirmModal from '../shared/ConfirmModal';
import { receiveCurrentPost, setCurrentPost, deletePost, updatePostScore, setConfirmModal } from './actions';

class PostsList extends Component {
    handlePostVoteScoreChange = (postId, option) => {
        this.props.updatePostScore({postId, option})
    }
    handleEditPost = postObj => {
        this.props.setCurrentPost(postObj.id);
        this.props.receiveCurrentPost(postObj);
        this.props.history.push(`/post-edit/${postObj.id}`);
    }
    handleDeletePost = () => {
        this.props.deletePost(this.props.confirmModal.id);
        this.props.setConfirmModal({
            isOpen: false,
            id: ''
        });
    }
    handleCancelDeletePost = () => {
        this.props.setConfirmModal({
            isOpen: false,
            id: ''
        });
    }
    render() {
        return (
            <div>
                <ul>
                    <hr></hr>
                    {this.props.posts.map(post => (
                        <li key={post.id}>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                            <VoteScoreControls handleVoteScoreChange={option => this.handlePostVoteScoreChange(post.id, option)} />
                            <div>
                                <div>{post.author}</div>
                                <div>{post.body}</div>
                                <div>score: {post.voteScore}</div>
                                <div>{post.timestamp}</div>
                                <div>comments: {post.commentsCount}</div>
                            </div>
                            <span onClick={() => this.handleEditPost(post)}>Edit</span>
                            <span onClick={() => this.props.setConfirmModal({isOpen: true, id: post.id})}>Delete</span>
                            <hr></hr>
                        </li>
                    ))}
                </ul>
                <ConfirmModal
                    handleSubmit={this.handleDeletePost}
                    handleCancel={this.handleCancelDeletePost}
                    isOpen={this.props.confirmModal.isOpen}
                    action="delete this post"
                />
            </div>
        )
    }
}

function mapStateToProps({ confirmModal }) {
    return {
        confirmModal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentPost: postId => dispatch(setCurrentPost(postId)),
        receiveCurrentPost: currentPost => dispatch(receiveCurrentPost(currentPost)),
        deletePost: postId => dispatch(deletePost(postId)),
        updatePostScore: changePostScoreObj => dispatch(updatePostScore(changePostScoreObj)),
        setConfirmModal: confirmModal => dispatch(setConfirmModal(confirmModal))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
