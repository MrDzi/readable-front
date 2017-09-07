import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PostsList from './PostsList';
import SortSelect from './SortSelect';
import { getPostsByCategorySelector, getPostsSelector } from '../selectors';
import { getPostsByCategory, setCurrentCategory, receiveCurrentPost } from '../actions';

class Category extends Component {
    componentWillMount() {
        let currentCategory = this.props.match.params.currentCategory;
        this.props.setCurrentCategory(currentCategory);
        this.props.getPostsByCategory(currentCategory);
    }
    editPost = postObj => {
        this.props.receiveCurrentPost(postObj);
        this.props.history.push(`/post-edit/${postObj.id}`);
    }
    render() {
        return (
            <div>
                <h1>{this.props.match.params.currentCategory}</h1>
                <Link to="/post-create">Add New Post</Link>
                <SortSelect target="posts" />
                <PostsList posts={this.props.postsByCategory} editPost={this.editPost} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: getPostsSelector(state),
        postsByCategory: getPostsByCategorySelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPostsByCategory: (currentCategory) => dispatch(getPostsByCategory(currentCategory)),
        setCurrentCategory: (currentCategory) => dispatch(setCurrentCategory(currentCategory)),
        receiveCurrentPost: currentPost => dispatch(receiveCurrentPost(currentPost))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
