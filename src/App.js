import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/:currentCategory" component={Category}></Route>
                <Route path="/post/:postId" component={Post}></Route>
                <Route path="/post-create" component={CreatePost}></Route>
                <Route path="/post-edit/:postId" component={EditPost}></Route>
            </div>
        );
    }
}

export default App;
