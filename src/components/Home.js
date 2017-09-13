import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import CategoriesList from './categories/CategoriesList';
import PostsList from './posts/PostsList';
import SortSelect from './shared/SortSelect';
import { getCategories } from './categories/actions';
import { getPosts } from './posts/actions';
import { getPostsSelector } from '../selectors';

class Home extends Component {
    componentWillMount() {
        this.props.getCategories();
        this.props.getPosts();
    }
    render() {
        return (
            <Row>
                <Col xs="9">
                    <SortSelect target="posts" />
                    <PostsList posts={this.props.posts} />
                </Col>
                <Col xs="3" className="home-sidebar">
                    <CategoriesList categories={this.props.categories} />
                </Col>
            </Row>
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
