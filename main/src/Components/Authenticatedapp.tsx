import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './home';
import NewPost from './newpost';
import UpdatePost from './updatepost';
import Profile from './profile';
import Settings from   './settings';
import SingleArticle from './singleArticle';
import ErrorPage from './Errorpage';
import { similarProps } from './typesDefined';


function AuthenticatedApp(props:similarProps): JSX.Element{
    const {user, handleLogout} = props;
    return(
        <Switch>
            <Route path='/' exact >
                <Home />
            </Route>
            <Route path='/newpost'  exact >
                <NewPost user={user} />
            </Route>
            <Route path='/updatepost/:slug'  exact >
                <UpdatePost user={user} />
            </Route>
            <Route path='/profile' exact >
                <Profile  user={user}  />
            </Route>
            <Route path='/settings'  exact >
                <Settings  user={user} handleLogout={handleLogout} />
            </Route>
            <Route path='/articles/:slug' >
                <SingleArticle user={user}  />
            </Route>
            <Route path='*' >
                <ErrorPage />
            </Route>
        </Switch>
    )
}

export default AuthenticatedApp;