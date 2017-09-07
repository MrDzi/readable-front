import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addPost, getCategories, receiveCurrentPost } from '../actions';
import { generateId } from '../utils/helpers';
import CreateEditPostForm from './CreateEditPostForm';

class CreatePost extends Component {
    componentWillMount() {
        this.props.getCategories();
        this.props.receiveCurrentPost({});
    }
    handleSubmit = (values) => {
        console.log(values);
        const id = generateId(),
              timestamp = Date.now();
        this.props.addPost({...values, id, timestamp});
        this.props.history.push("/");
    }
    render() {
        return (
            <div>
                <h1>Create Post</h1>
                <CreateEditPostForm onSubmit={this.handleSubmit} categories={this.props.categories.categories} />
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
        addPost: postObj => dispatch(addPost(postObj)),
        getCategories: () => dispatch(getCategories()),
        receiveCurrentPost: currentPost => dispatch(receiveCurrentPost(currentPost))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePost));
