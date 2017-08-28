import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostsList from './PostsList';
import { getPostsByCategorySelector, getPostsSelector } from '../selectors';
import { getPostsByCategory, setCurrentCategory } from '../actions';

class Category extends Component {
    componentWillMount() {
        let currentCategory = this.props.match.params.currentCategory;
        this.props.setCurrentCategory(currentCategory);
        this.props.getPostsByCategory(currentCategory);
    }
    render() {
        return (
            <div>
                <h1>{this.props.match.params.currentCategory}</h1>
                <PostsList posts={this.props.postsByCategory}></PostsList>
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
        setCurrentCategory: (currentCategory) => dispatch(setCurrentCategory(currentCategory))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
