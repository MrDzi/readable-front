import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

let ConfirmModal = ({ handleSubmit, handleCancel, isOpen, action }) => {
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Are you sure you want to {action}?</ModalHeader>
            <ModalFooter>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSubmit}>Confirm</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ConfirmModal;
