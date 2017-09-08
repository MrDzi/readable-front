import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import CommentsList from './CommentsList';
import CommentsForm from './CommentsForm';
import SortSelect from './SortSelect';
import VoteScoreControls from './VoteScoreControls';
import { getCommentsSelector } from '../selectors';
import { setCurrentPost, getComments, addComment, updatePostScore, deletePost } from '../actions';
import { generateId } from '../utils/helpers';

class Post extends Component {
    constructor(props) {
        super(props);
        this.postId = this.props.match.params.postId;
    }
    componentWillMount() {
        this.props.setCurrentPost(this.postId);
        this.props.getComments(this.postId);
    }
    handleCommentSubmit = (values) => {
        const id = generateId(),
              timestamp = Date.now(),
              voteScore = 1;
        this.props.addComment({...values, id, timestamp, voteScore, parentId: this.postId});
    }
    handleDeletePost = () => {
        this.props.deletePost(this.postId);
        this.props.history.push("/");
    }
    handlePostVoteScoreChange = (option) => {
        this.props.updatePostScore({postId: this.postId, option})
    }
    render() {
        return (
            <div>
                <h3>{this.props.currentPost.title}</h3>
                <div>
                    <VoteScoreControls handleVoteScoreChange={this.handlePostVoteScoreChange} />
                    <span onClick={this.handleDeletePost}>Delete</span>
                </div>
                <div>{this.props.currentPost.body}</div>
                <div>Score: {this.props.currentPost.voteScore}</div>
                <Link to={`/post-edit/${this.postId}`}>Edit</Link>
                <SortSelect target="comments" />
                <CommentsList comments={this.props.comments} handleCommentDelete={this.handleCommentDelete} handleCommentVoteScoreChange={this.handleCommentVoteScoreChange} handleCommentEdit={this.handleCommentEdit} />
                <CommentsForm type="create" onSubmit={this.handleCommentSubmit} handleCommentSubmit={this.handleCommentSubmit} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentPost: state.posts.currentPost,
        comments: getCommentsSelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentPost: postId => dispatch(setCurrentPost(postId)),
        getComments: postId => dispatch(getComments(postId)),
        addComment: commentObj => dispatch(addComment(commentObj)),
        updatePostScore: changeScorePostObj => dispatch(updatePostScore(changeScorePostObj)),
        deletePost: postId => dispatch(deletePost(postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
