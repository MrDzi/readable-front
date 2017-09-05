import React from 'react';
import { Field, reduxForm } from 'redux-form';

let CreateEditPostForm = props => {
    const { handleSubmit, categories } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="author">Author</label>
                <Field name="author" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="title">Title</label>
                <Field name="title" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="body">Body</label>
                <Field name="body" component="textarea" type="text" />
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <Field name="category" component="select">
                    <option value="" disabled>Category</option>
                    {categories.map((category) => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                    ))}
                </Field>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

CreateEditPostForm = reduxForm({
    form: 'create-edit-post'
})(CreateEditPostForm);

export default CreateEditPostForm;
