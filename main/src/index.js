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
import url from './Components/URL';
import Loader from './Components/loader';
import NewPost from './Components/newpost';
import Profile from './Components/profile'
import Settings from   './Components/settings'


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:null,
            isLoggedin:false,
            isVerifying : true,
        };
    }
    
    componentDidMount(){
        let key = localStorage[url.localStorageKey];
        let {userVerifyURL} = url;
        if(key){
            fetch(userVerifyURL,{
                method: 'GET',
                headers:{
                    authorization : `Token ${key}`,
                }
            }).then(res => {
                if(!res.ok){
                    return res.json().then(({errors}) => {
                        return Promise.reject(errors);
                    });
                }else{
                    return res.json()
                }
            })
            .then(({user}) => {
                this.updateUser(user);
            })
            .catch(errors => console.log(errors))
        }else {
            this.setState({isVerifying:false})
        }
    }
    updateUser = (user) => {
        this.setState({isLoggedin:true,user,isVerifying:false});
        localStorage.setItem( url.localStorageKey, user.token);
    }
    
    render(){
        if(this.state.isVerifying){
            return <Loader />
        }
        return (
            <BrowserRouter>
                <Header isLoggedin={this.state.isLoggedin} user={this.state.user} />
                {
                    this.state.isLoggedin ?
                    <AuthenticatedApp user={this.state.user} updateUser={this.updateUser} /> : 
                    <UnAuthenticatedApp user={this.state.user} updateUser={this.updateUser}/>
                }
            </BrowserRouter>
        )
    }
}

function AuthenticatedApp(props){
    return(
        <Switch>
            <Route path='/' exact >
                <Home />
            </Route>
            <Route path='/newpost'  exact >
                <NewPost user={props.user} />
            </Route>
            <Route path='/profile'  user={props.user}  exact >
                <Profile />
            </Route>
            <Route path='/settings'  user={props.user}  updateUser={props.updateUser}   exact >
                <Settings />
            </Route>
            <Route path='/articles/:slug' >
                <SingleArticle user={props.user} />
            </Route>
            <Route path='*' >
                <ErrorPage />
            </Route>
        </Switch>
    )
}
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
                <SingleArticle user={props.user} />
            </Route>
            <Route path='*' >
                <ErrorPage />
            </Route>
        </Switch>
    )
}
ReactDOM.render(<App />, document.getElementById(`root`));