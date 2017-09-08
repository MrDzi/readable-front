import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

let CommentsForm = props => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
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

function mapStateToProps({ comments }, props) {
    console.log(props);
    return {
        initialValues: props.type === 'create' ? {} : comments.editCommentDraft
    }
}

CommentsForm = reduxForm({
    form: 'comments-form',
    enableReinitialize: true
})(CommentsForm);

export default connect(mapStateToProps)(CommentsForm);
