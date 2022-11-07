import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './home';
import SingleArticle from './singleArticle';
import ErrorPage from './Errorpage';
import Signup from './signup'
import Signin from './signin'
import { similarProps, unauthenticatedAppProps } from './typesDefined';

function UnAuthenticatedApp(props:unauthenticatedAppProps):JSX.Element{
    const {updateUser, user} = props;
    return (
        <Switch>
            <Route path='/' exact >
                <Home />
            </Route>
            <Route path='/signup'exact >
                <Signup  updateUser={updateUser}   />
            </Route>
            <Route path='/signin'  exact >
                <Signin updateUser={updateUser}  />
            </Route>
            <Route path='/articles/:slug' >
                <SingleArticle user={user } />
            </Route>
            <Route path='*' >
                <ErrorPage />
            </Route>
        </Switch>
    )
}

export default UnAuthenticatedApp;