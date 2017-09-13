import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col } from 'reactstrap';
import PostsList from '../posts/PostsList';
import SortSelect from '../shared/SortSelect';
import { getPostsByCategorySelector } from '../../selectors';
import { getPostsByCategory, setCurrentCategory } from './actions';

class Category extends Component {
    componentWillMount() {
        let currentCategory = this.props.match.params.currentCategory;
        this.props.setCurrentCategory(currentCategory);
        this.props.getPostsByCategory(currentCategory);
    }
    render() {
        return (
            <Col xs={{size: 6, offset: 3}}>
                <h1>{this.props.match.params.currentCategory}</h1>
                {this.props.postsByCategory.length > 0 && (
                    <SortSelect target="posts" />
                )}
                <PostsList posts={this.props.postsByCategory} />
            </Col>
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
        getPostsByCategory: currentCategory => dispatch(getPostsByCategory(currentCategory)),
        setCurrentCategory: currentCategory => dispatch(setCurrentCategory(currentCategory))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
