import React from 'react';
import ReactDOM from 'react-dom';
import './Stylesheets/main-styles/main.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Header from './Components/header.js';
import Home from './Components/home.js';
import Signup from './Components/signup'
import Signin from './Components/signin'
import ErrorPage from './Components/Errorpage';
import SingleArticle from './Components/singleArticle';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                <Route path='/' exact >
                    <Home />
                </Route>
                <Route path='/signup' exact >
                    <Signup />
                </Route>
                <Route path='/signin' exact >
                    <Signin />
                </Route>
                <Route path='/articles/:slug' component={SingleArticle} />
                <Route path='*' >
                    <ErrorPage />
                </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById(`root`));