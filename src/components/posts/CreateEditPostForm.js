import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { renderInputField, renderTextareaField, validateRequired } from '../../utils/helpers';

let CreateEditPostForm = props => {
    const { handleSubmit, categories, type, history } = props;
    return (
        <form onSubmit={handleSubmit}>
            {type === 'create' &&
                <div>
                    <label htmlFor="author">Author</label>
                    <Field name="author" component="renderField" type="text" />
                </div>
            }
            <div>
                <Field name="title" component={renderInputField} label="Title" type="text" validate={validateRequired} />
            </div>
            <div>
                <label htmlFor="body">Body</label>
                <Field name="body" component={renderTextareaField} type="text" validate={validateRequired} />
            </div>
            {type === 'create' &&
                <div>
                    <label htmlFor="category">Category</label>
                    <Field name="category" component="select">
                        <option value="" disabled>Category</option>
                        {categories.map((category) => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                    </Field>
                </div>
            }
            <button type="submit">Submit</button>
            <button onClick={history.goBack}>Cancel</button>
        </form>
    );
}

function mapStateToProps({ posts }) {
    return {
        initialValues: posts.currentPost
    }
}

CreateEditPostForm = reduxForm({
    form: 'post-form'
})(CreateEditPostForm);

export default withRouter(connect(mapStateToProps)(CreateEditPostForm));
