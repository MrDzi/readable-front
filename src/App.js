import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route path="/" exact component={Home}></Route>
                <Route path="/category/:currentCategory" component={Category}></Route>
            </div>
        );
    }
}

export default App;
