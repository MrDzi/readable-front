import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPostsSortingOption } from '../actions';

class SortSelect extends Component {
    render() {
        return (
            <div>
                <span>Sort by:</span>
                <select onChange={(e) => this.props.setPostsSortingOption(e.target.value)}>
                    <option value="voteScore">Vote score</option>
                    <option value="timestamp">Timestamp</option>
                </select>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPostsSortingOption: (sortingOption) => dispatch(setPostsSortingOption(sortingOption))
    }
}

export default connect(null, mapDispatchToProps)(SortSelect);
