import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

let CreateEditPostForm = props => {
    const { handleSubmit, categories, type, history } = props;
    return (
        <form onSubmit={handleSubmit}>
            {type === 'create' &&
                <div>
                    <label htmlFor="author">Author</label>
                    <Field name="author" component="input" type="text" />
                </div>
            }
            <div>
                <label htmlFor="title">Title</label>
                <Field name="title" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="body">Body</label>
                <Field name="body" component="textarea" type="text" />
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
