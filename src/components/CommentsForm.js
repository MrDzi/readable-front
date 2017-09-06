import React from 'react';
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

CommentsForm = reduxForm({
    form: 'comments-form'
})(CommentsForm);

export default CommentsForm;
