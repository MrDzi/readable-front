import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import VoteScoreControls from '../shared/VoteScoreControls';
import CommentsForm from './CommentsForm';
import ConfirmModal from '../shared/ConfirmModal';
import { setConfirmModal } from '../../Actions';
import { deleteComment, updateCommentScore, editComment, toggleEditCommentModal, setEditCommentDraft } from './actions';

class CommentsList extends Component {
    handleCommentDelete = () => {
        this.props.deleteComment(this.props.confirmModal.id);
        this.props.setConfirmModal({
            isCommentModalOpen: false,
            id: ''
        });
    }
    handleCommentEdit = values => {
        this.props.editComment(values);
    }
    handleCommentVoteScoreChange = (option, commentId) => {
        this.props.updateCommentScore({commentId, option})
    }
    openEditCommentModal(commentObj) {
        this.props.toggleEditCommentModal(true);
        this.props.setEditCommentDraft(commentObj);
    }
    componentWillUnmount() {
        this.props.toggleEditCommentModal(false);
    }
    render() {
        return (
            <div>
                <ul>
                    {this.props.comments.map(comment => (
                        <li key={comment.id}>
                            <div>
                                {comment.body} <span>{comment.voteScore}</span>
                                <span onClick={() => this.props.setConfirmModal({isCommentModalOpen: true, id: this.commentId})}>Delete</span>
                                <span onClick={() => this.openEditCommentModal(comment)}>Edit</span>
                                <VoteScoreControls handleVoteScoreChange={(option) => this.handleCommentVoteScoreChange(option, comment.id)} />
                            </div>
                        </li>
                    ))}
                </ul>
                <Modal isOpen={this.props.editCommentModalOpened} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit comment</ModalHeader>
                    <ModalBody>
                        <CommentsForm type="edit" onSubmit={this.handleCommentEdit} />
                    </ModalBody>
                </Modal>
                <ConfirmModal
                    handleSubmit={this.handleCommentDelete}
                    isOpen={this.props.confirmModal.isCommentModalOpen}
                    action="delete this comment"
                />
            </div>
        )
    }
}

function mapStateToProps({ comments, confirmModal }) {
    return {
        editCommentModalOpened: comments.editCommentModalOpened,
        editCommentDraft: comments.editCommentDraft,
        confirmModal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteComment: commentId => dispatch(deleteComment(commentId)),
        editComment: commentObj => dispatch(editComment(commentObj)),
        updateCommentScore: changeScoreCommentObj => dispatch(updateCommentScore(changeScoreCommentObj)),
        toggleEditCommentModal: editCommentModalOpened => dispatch(toggleEditCommentModal(editCommentModalOpened)),
        setEditCommentDraft: editCommentDraft => dispatch(setEditCommentDraft(editCommentDraft)),
        setConfirmModal: confirmModal => dispatch(setConfirmModal(confirmModal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
