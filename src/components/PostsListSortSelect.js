import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSortingOption } from '../actions';

class PostsListSortSelect extends Component {
    render() {
        return (
            <div>
                <span>Sort by:</span>
                <select>
                    <option value="voteScore">Vote score</option>
                    <option value="timestamp">Timestamp</option>
                </select>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSortingOption: (sortingOption) => dispatch(setSortingOption(sortingOption))
    }
}

export default connect(null, mapDispatchToProps)(PostsListSortSelect);
