import {Route,Switch} from 'react-router-dom';
import Home from './home.js';
import SingleArticle from './singleArticle';
import ErrorPage from './Errorpage';
import Signup from './signup'
import Signin from './signin'

function UnAuthenticatedApp(props){
    return (
        <Switch>
            <Route path='/' exact >
                <Home />
            </Route>
            <Route path='/signup'exact >
                <Signup  updateUser={props.updateUser}   />
            </Route>
            <Route path='/signin'  exact >
                <Signin updateUser={props.updateUser}  />
            </Route>
            <Route path='/articles/:slug' >
                <SingleArticle user={props.user } />
            </Route>
            <Route path='*' >
                <ErrorPage />
            </Route>
        </Switch>
    )
}

export default UnAuthenticatedApp;