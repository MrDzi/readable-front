import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { Icon } from 'react-fa';
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
            <Col xs={{size: 6, offset: 3}}>
                <div className="post">
                    <h3 className="post__headline">{this.props.currentPost.title}</h3>
                    <div className="actions-block">
                        <VoteScoreControls handleVoteScoreChange={this.handlePostVoteScoreChange} />
                        <div>
                            <Link className="u-mr-10" to={`/post-edit/${this.postId}`}><Icon name="pencil" /></Link>
                            <Icon name="trash" onClick={() => this.props.setConfirmModal({isPostModalOpen: true, id: this.postId})} />
                        </div>
                    </div>
                    <div className="post__content">{this.props.currentPost.body}</div>
                    <div className="post__score">Score: {this.props.currentPost.voteScore}</div>
                    <div className="post__comments">
                        <SortSelect target="comments" />
                        <CommentsList comments={this.props.comments} />
                    </div>
                    <CommentsForm form="create-comment" type="create" handleCommentSubmit={this.handleCommentSubmit} />
                    <ConfirmModal
                        handleSubmit={this.handleDeletePost}
                        isOpen={this.props.confirmModal.isPostModalOpen}
                        action="delete this post"
                    />
                </div>
            </Col>
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
