import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import CommentsList from './CommentsList';
import CommentsForm from './CommentsForm';
import SortSelect from './SortSelect';
import VoteScoreControls from './VoteScoreControls';
import { getCommentsSelector } from '../selectors';
import { getCurrentPost, getComments, addComment, deleteComment, updatePostScore, updateCommentScore, deletePost } from '../actions';
import { generateId } from '../utils/helpers';

class Post extends Component {
    constructor(props) {
        super(props);
        this.postId = this.props.match.params.postId;
    }
    componentWillMount() {
        this.props.getCurrentPost(this.postId);
        this.props.getComments(this.postId);
    }
    handleCommentSubmit = (values) => {
        console.log(values);
        const id = generateId(),
              timestamp = Date.now(),
              voteScore = 1;
        this.props.addComment({...values, id, timestamp, voteScore, parentId: this.postId});
    }
    handleDeletePost = () => {
        this.props.deletePost(this.postId);
        this.props.history.push("/");
    }
    handleDeleteComment = (commentId) => {
        this.props.deleteComment(commentId);
    }
    handlePostVoteScoreChange = (option) => {
        this.props.updatePostScore({postId: this.postId, option})
    }
    handleCommentVoteScoreChange = (option, commentId) => {
        this.props.updateCommentScore({commentId, option})
    }
    render() {
        return (
            <div>
                <div>
                    <VoteScoreControls handleVoteScoreChange={this.handlePostVoteScoreChange} />
                    <span onClick={this.handleDeletePost}>Delete</span>
                </div>
                <div>{this.props.posts.currentPost.body}</div>
                <div>Score: {this.props.posts.currentPost.voteScore}</div>
                <Link to={`/post-edit/${this.postId}`}>Edit</Link>
                <SortSelect target="comments" />
                <CommentsList comments={this.props.comments} handleDeleteComment={this.handleDeleteComment} handleCommentVoteScoreChange={this.handleCommentVoteScoreChange} />
                <CommentsForm onSubmit={this.handleCommentSubmit} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        comments: getCommentsSelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCurrentPost: postId => dispatch(getCurrentPost(postId)),
        getComments: postId => dispatch(getComments(postId)),
        addComment: commentObj => dispatch(addComment(commentObj)),
        deleteComment: commentId => dispatch(deleteComment(commentId)),
        updatePostScore: changeScorePostObj => dispatch(updatePostScore(changeScorePostObj)),
        updateCommentScore: changeScoreCommentObj => dispatch(updateCommentScore(changeScoreCommentObj)),
        deletePost: postId => dispatch(deletePost(postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
