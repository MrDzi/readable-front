import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import Post from './components/Post';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route path="/" exact component={Home}></Route>
                <Route path="/category/:currentCategory" component={Category}></Route>
                <Route path="/post/:postId" component={Post}></Route>
            </div>
        );
    }
}

export default App;
