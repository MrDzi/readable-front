import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import VoteScoreControls from './VoteScoreControls';
import { receiveCurrentPost, setCurrentPost, deletePost, updatePostScore } from '../actions';

class PostsList extends Component {
    handlePostVoteScoreChange = (postId, option) => {
        this.props.updatePostScore({postId, option})
    }
    handleEditPost = postObj => {
        this.props.setCurrentPost(postObj.id);
        this.props.receiveCurrentPost(postObj);
        this.props.history.push(`/post-edit/${postObj.id}`);
    }
    render() {
        return (
            <ul>
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
                        <span onClick={() => this.props.deletePost(post.id)}>Delete</span>
                        <hr></hr>
                    </li>
                ))}
            </ul>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentPost: postId => dispatch(setCurrentPost(postId)),
        receiveCurrentPost: currentPost => dispatch(receiveCurrentPost(currentPost)),
        deletePost: postId => dispatch(deletePost(postId)),
        updatePostScore: changePostScoreObj => dispatch(updatePostScore(changePostScoreObj))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(PostsList));
