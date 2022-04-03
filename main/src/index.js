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
import UpdatePost from './Components/updatepost';
import Profile from './Components/profile'
import Settings from   './Components/settings';
import ErrorBoundary from './Components/ErrorBoundary';
import UserContext from './Components/userContext';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:null,
            isLoggedin:false,
            isVerifying : true,
            // isFollowed:false,
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
    handleLogout = () => {
        // console.log("logout")
        localStorage.clear();
        this.setState({isLoggedin:false})
    }
    render(){
        let {user,isLoggedin}  = this.state;
        if(this.state.isVerifying){
            return <Loader />
        }
        // console.log(this.state.user)
        return (
            <UserContext.Provider value={{user,isLoggedin}} >
            <BrowserRouter>
                <Header isLoggedin={this.state.isLoggedin} user={this.state.user} />
                {
                    this.state.isLoggedin ?
                    <AuthenticatedApp  user={this.state.user} handleLogout={this.handleLogout} updateUser={this.updateUser} /> : 
                    <UnAuthenticatedApp user={this.state.user} updateUser={this.updateUser}/>
                }
            </BrowserRouter>
            </UserContext.Provider>
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
ReactDOM.render(
<ErrorBoundary>
<App />
</ErrorBoundary>
, document.getElementById(`root`));
