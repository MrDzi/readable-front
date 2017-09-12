import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Icon } from 'react-fa';
import VoteScoreControls from '../shared/VoteScoreControls';
import ConfirmModal from '../shared/ConfirmModal';
import { receiveCurrentPost, setCurrentPost, deletePost, updatePostScore } from './actions';
import { setConfirmModal } from '../../Actions';

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
            isPostModalOpen: false,
            id: ''
        });
    }
    render() {
        return (
            <div>
                <ul className="posts-list u-list-reset-styles">
                    {this.props.posts.map(post => (
                        <li className="posts-list__item" key={post.id}>
                            <h3 className="posts-list__headline">
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </h3>
                            <div>
                                <div className="posts-list__author">{post.author}</div>
                                <div className="posts-list__content">{post.body}</div>
                                <div className="posts-list__score">score: {post.voteScore}</div>
                                <div className="posts-list__time">{post.timestamp}</div>
                                <div className="posts-list__comments-count">comments: {post.commentsCount}</div>
                            </div>
                            <div className="actions-block">
                                <VoteScoreControls handleVoteScoreChange={option => this.handlePostVoteScoreChange(post.id, option)} />
                                <div>
                                    <Icon name="pencil" onClick={() => this.handleEditPost(post)} />
                                    <Icon name="trash" onClick={() => this.props.setConfirmModal({isPostModalOpen: true, id: post.id})} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <ConfirmModal
                    handleSubmit={this.handleDeletePost}
                    isOpen={this.props.confirmModal.isPostModalOpen}
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
