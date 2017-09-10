import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { setConfirmModal } from '../../Actions';

class ConfirmModal extends Component {
    handleCancel = () => {
        this.props.setConfirmModal({
            isPostModalOpen: false,
            isCommentModalOpen: false,
            id: ''
        });
    }
    render() {
        const { handleSubmit, isOpen, action } = this.props;
        return (
            <Modal isOpen={isOpen}>
                <ModalHeader>Are you sure you want to {action}?</ModalHeader>
                <ModalFooter>
                    <Button onClick={this.handleCancel}>Cancel</Button>
                    <Button onClick={handleSubmit}>Confirm</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setConfirmModal: confirmModal => dispatch(setConfirmModal(confirmModal))
    }
}

export default connect(null, mapDispatchToProps)(ConfirmModal);
