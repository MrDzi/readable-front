import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateEditPostForm from './CreateEditPostForm';
import { editPost, getCurrentPost, getCategories } from '../actions';

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.postId = this.props.match.params.postId;
    }
    componentWillMount() {
        this.props.getCategories();
    }
    render() {
        return (
            <div>
                <h1>Edit Post</h1>
                <CreateEditPostForm onSubmit={this.handleSubmit} categories={this.props.categories.categories} />
            </div>
        )
    }
}

function mapStateToProps({ categories }) {
    return {
        categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editPost: (postObj) => dispatch(editPost(postObj)),
        getCurrentPost: postId => dispatch(getCurrentPost(postId)),
        getCategories: () => dispatch(getCategories())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost));
