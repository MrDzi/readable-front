import React, { Component } from 'react';
import { createSelector } from 'reselect';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route path="/" exact component={Home}></Route>
                <Route path="/category/:category" render={() => (
                    <div>test {this.props.match.params.category}</div>
                )}>
                </Route>
            </div>
        );
    }
}

export default App;
