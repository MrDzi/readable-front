import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import PostsList from './posts/PostsList';
import SortSelect from './shared/SortSelect';
import { getPosts } from './posts/actions';
import { getPostsSelector } from '../selectors';

class Home extends Component {
    componentWillMount() {
        this.props.getPosts();
    }
    render() {
        const { posts } = this.props;
        return (
            <Row className="justify-content-center">
                <Col xs="6">
                    {posts.length > 0 && (
                        <SortSelect target="posts" />
                    )}
                    <PostsList posts={posts} />
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: getPostsSelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: () => dispatch(getPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
