import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateEditPostForm from './CreateEditPostForm';
import { editPost, setCurrentPost } from './actions';
import { getCategories } from '../categories/actions';

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.postId = this.props.match.params.postId;
    }
    componentWillMount() {
        this.props.getCategories();
    }
    handleSubmit = values => {
        this.props.editPost(values);
        this.props.history.push("/");
    }
    render() {
        return (
            <div>
                <h1>Edit Post</h1>
                <CreateEditPostForm onSubmit={this.handleSubmit} categories={this.props.categories.categories} type="edit" />
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
        editPost: postObj => dispatch(editPost(postObj)),
        setCurrentPost: postId => dispatch(setCurrentPost(postId)),
        getCategories: () => dispatch(getCategories())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost));
