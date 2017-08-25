import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from './actions';
import './App.css';

class App extends Component {
    componentWillMount() {
        this.props.getCategories();
    }
    render() {
        return (
            <div className="App">
                <ul>
                    {this.props.categories.map(category => (
                        <li>{category.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
