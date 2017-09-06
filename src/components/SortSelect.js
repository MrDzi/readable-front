import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPostsSortingOption, setCommentsSortingOption } from '../actions';

class SortSelect extends Component {
    handleSortChange(value) {
        this.props.target === 'posts' && this.props.setPostsSortingOption(value);
        this.props.target === 'comments' && this.props.setCommentsSortingOption(value);
    }
    render() {
        return (
            <div>
                <span>Sort {this.props.target} by:</span>
                <select onChange={(e) => this.handleSortChange(e.target.value)}>
                    <option value="voteScore">Vote score</option>
                    <option value="timestamp">Timestamp</option>
                </select>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPostsSortingOption: (sortingOption) => dispatch(setPostsSortingOption(sortingOption)),
        setCommentsSortingOption: (sortingOption) => dispatch(setCommentsSortingOption(sortingOption))
    }
}

export default connect(null, mapDispatchToProps)(SortSelect);
