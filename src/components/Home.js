import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CategoriesList from './CategoriesList';
import PostsList from './PostsList';
import SortSelect from './SortSelect';
import { getCategories, getPosts, receiveCurrentPost } from '../actions';
import { getPostsSelector } from '../selectors'

class Home extends Component {
    componentWillMount() {
        this.props.getCategories();
        this.props.getPosts();
    }
    editPost = postObj => {
        this.props.receiveCurrentPost(postObj);
        this.props.history.push(`/post-edit/${postObj.id}`);
    }
    render() {
        return (
            <div>
                <CategoriesList categories={this.props.categories} />
                <Link to="/post-create">Add New Post</Link>
                <SortSelect target="posts" />
                <PostsList posts={this.props.posts} editPost={this.editPost} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories.categories,
        posts: getPostsSelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
        getPosts: () => dispatch(getPosts()),
        receiveCurrentPost: currentPost => dispatch(receiveCurrentPost(currentPost))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
