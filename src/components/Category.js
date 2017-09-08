import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PostsList from './PostsList';
import SortSelect from './SortSelect';
import { getPostsByCategorySelector } from '../selectors';
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
                <Link to="/post-create">Add New Post</Link>
                <SortSelect target="posts" />
                <PostsList posts={this.props.postsByCategory} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        postsByCategory: getPostsByCategorySelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPostsByCategory: (currentCategory) => dispatch(getPostsByCategory(currentCategory)),
        setCurrentCategory: (currentCategory) => dispatch(setCurrentCategory(currentCategory))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
