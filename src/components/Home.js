import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CategoriesList from './CategoriesList';
import PostsList from './PostsList';
import { getCategories, getPosts } from '../actions';
import { getPostsSelector } from '../selectors'

class Home extends Component {
    componentWillMount() {
        this.props.getCategories();
        this.props.getPosts();
    }
    goToCategory(category) {

    }
    render() {
        return (
            <div>
                <CategoriesList categories={this.props.categories} goToCategory={this.goToCategory}></CategoriesList>
                <PostsList posts={this.props.posts}></PostsList>
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
