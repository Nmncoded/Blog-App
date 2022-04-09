import {Route,Switch} from 'react-router-dom';
import NewPost from './newpost';
import UpdatePost from './updatepost';
import Profile from './profile'
import Settings from   './settings';
import Home from './home.js';
import SingleArticle from './singleArticle';
import ErrorPage from './Errorpage';


function AuthenticatedApp(props){
    return(
        <Switch>
            <Route path='/' exact >
                <Home />
            </Route>
            <Route path='/newpost'  exact >
                <NewPost user={props.user} />
            </Route>
            <Route path='/updatepost/:slug'  exact >
                <UpdatePost user={props.user} />
            </Route>
            <Route path='/profile' exact >
                <Profile  user={props.user}  />
            </Route>
            <Route path='/settings'   updateUser={props.updateUser}   exact >
                <Settings  user={props.user} handleLogout={props.handleLogout} />
            </Route>
            <Route path='/articles/:slug' >
                <SingleArticle user={props.user}  />
            </Route>
            <Route path='*' >
                <ErrorPage />
            </Route>
        </Switch>
    )
}

export default AuthenticatedApp;