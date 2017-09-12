import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from './components/shared/Header';
import Home from './components/Home';
import Category from './components/categories/Category';
import Post from './components/posts/Post';
import CreatePost from './components/posts/CreatePost';
import EditPost from './components/posts/EditPost';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div className="app-content">
                    <Container>
                        <Switch>
                            <Route exact path="/" component={Home}></Route>
                            <Route path="/post-create" component={CreatePost}></Route>
                            <Route path="/post/:postId" component={Post}></Route>
                            <Route path="/post-edit/:postId" component={EditPost}></Route>
                            <Route exact path="/:currentCategory" component={Category}></Route>
                        </Switch>
                    </Container>
                </div>
            </div>
        );
    }
}

export default App;
