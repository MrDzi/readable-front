import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCommentsSelector } from '../selectors';
import { getCurrentPost, getComments } from '../actions';

class Post extends Component {
    componentWillMount() {
        let postId = this.props.match.params.postId;
        this.props.getCurrentPost(postId);
        this.props.getComments(postId);
    }
    render() {
        return (
            <div>
                <div>{this.props.posts.currentPost.body}</div>
                <ul>
                    {this.props.comments.map(comment => (
                        <li key={comment.id}>{comment.body}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        comments: getCommentsSelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCurrentPost: postId => dispatch(getCurrentPost(postId)),
        getComments: postId => dispatch(getComments(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
