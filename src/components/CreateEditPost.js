import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, getCategories } from '../actions';
import CreateEditPostForm from './CreateEditPostForm';

class CreateEditPost extends Component {
    componentWillMount() {
        this.props.getCategories();
    }
    handleSubmit = (values) => {
        console.log(values);
        this.props.addPost(values); // TODO id & timestamp
    }
    render() {
        return (
            <div>
                <h1>Create Edit Post</h1>
                <CreateEditPostForm onSubmit={this.handleSubmit} categories={this.props.categories.categories}></CreateEditPostForm>
            </div>
        );
    }
}

function mapStateToProps({ categories }) {
    return {
        categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: (postObj) => dispatch(addPost(postObj)),
        getCategories: () => dispatch(getCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPost);
