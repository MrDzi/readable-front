import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';
import { toggleEditCommentModal } from './actions';

class CommentsForm extends Component {
    submit = (values) => {
        const { handleCommentSubmit, reset } = this.props;
        handleCommentSubmit(values);
        reset();
    }
    render() {
        const { handleSubmit, type } = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit.bind(this))}>
                <div>
                    <label htmlFor="author">Author</label>
                    <Field name="author" component="input" type="text" />
                </div>
                <div>
                    <label htmlFor="body">Body</label>
                    <Field name="body" component="textarea" type="text" />
                </div>
                {type === 'edit' && (
                    <Button onClick={() => this.props.toggleEditCommentModal(false)}>Cancel</Button>
                )}
                <Button type="submit">Submit</Button>
            </form>
        );
    }
}

function mapStateToProps({ comments }, { type }) {
    return {
        type,
        initialValues: type === 'create' ? {} : comments.editCommentDraft,
        editCommentModalOpened: comments.editCommentModalOpened
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleEditCommentModal: editCommentModalOpened => dispatch(toggleEditCommentModal(editCommentModalOpened))
    }
}

CommentsForm = reduxForm({
    enableReinitialize: true
})(CommentsForm);

export default connect(mapStateToProps, mapDispatchToProps)(CommentsForm);
