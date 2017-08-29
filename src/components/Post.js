import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getPostSelctor } from '../selectors';
import { setCurrentPost, getPost } from '../actions';

class Post extends Component {
    componentWillMount() {
        let postId = this.props.match.params.postId;
        this.props.getPost(postId);
        this.props.setCurrentPost(postId);
    }
    render() {
        return (
            <div>{this.props.post.body}</div>
        )
    }
}

function mapStateToProps({ post }) {
    return {
        post
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (postId) => dispatch(getPost(postId)),
        setCurrentPost: (currentPostId) => dispatch(setCurrentPost(currentPostId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
