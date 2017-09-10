import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

let formType = null;

class CommentsForm extends Component {
    submit = (values) => {
        const { handleCommentSubmit, reset } = this.props;
        handleCommentSubmit(values);
        reset();
    }
    render() {
        const { handleSubmit } = this.props;
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
                <button type="submit">Submit</button>
            </form>
        );
    }
}

function mapStateToProps({ comments }, { type }) {
    formType = type;
    return {
        initialValues: type === 'create' ? {} : comments.editCommentDraft
    }
}

CommentsForm = reduxForm({
    form: `comments-form-${formType}`,
    reinitialize: true
})(CommentsForm);

export default connect(mapStateToProps)(CommentsForm);
