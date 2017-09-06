import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoriesList from './CategoriesList';
import PostsList from './PostsList';
import SortSelect from './SortSelect';
import { getCategories, getPosts } from '../actions';
import { getPostsSelector } from '../selectors'

class Home extends Component {
    componentWillMount() {
        this.props.getCategories();
        this.props.getPosts();
    }
    render() {
        return (
            <div>
                <CategoriesList categories={this.props.categories} />
                <Link to="/post-create">Add New Post</Link>
                <SortSelect target="posts" />
                <PostsList posts={this.props.posts} />
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
        getPosts: () => dispatch(getPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
