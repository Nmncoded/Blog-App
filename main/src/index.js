import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Stylesheets/main-styles/main.css';
import {BrowserRouter} from 'react-router-dom';
import Header from './Components/header.js';
import url from './Components/URL';
import Loader from './Components/loader';
import ErrorBoundary from './Components/ErrorBoundary';
import UserContext from './Components/userContext';
import AuthenticatedApp from './Components/Authenticatedapp';
import UnAuthenticatedApp from './Components/unauthenticatedapp';

function App(props){
    let [user,setUser] = useState(null);
    let [isLoggedin,setIsLoggedIn] = useState(false);
    let [isVerifying,setIsVerifying] = useState(true);
    
    useEffect(() => {
        
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
                
                updateUser(user);
            })
            .catch(errors => console.log(errors))
        }else {
            setIsVerifying(isVerifying = false);
        }
    },[])
    const updateUser = (user) => {
        // this.setState({isLoggedin:true,user,isVerifying:false});
        setIsLoggedIn(isLoggedin = true);
        setUser(user);
        setIsVerifying(isVerifying = false);
        localStorage.setItem( url.localStorageKey, user.token);
    }
    const handleLogout = () => {
        // console.log("logout")
        localStorage.clear();
        setIsLoggedIn(isLoggedin = false)
        // this.setState({isLoggedin:false})
    }
        if(isVerifying){
            return <Loader />
        }
        return (
            <UserContext.Provider value={{user,isLoggedin}} >
            <BrowserRouter>
                <Header isLoggedin={isLoggedin} user={user} />
                {
                    isLoggedin ?
                    <AuthenticatedApp  user={user} handleLogout={handleLogout} updateUser={updateUser} /> : 
                    <UnAuthenticatedApp user={user} updateUser={updateUser}/>
                }
            </BrowserRouter>
            </UserContext.Provider>
        )
}

/* class App extends React.Component {
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
} */




ReactDOM.render(
<ErrorBoundary>
<App />
</ErrorBoundary>
, document.getElementById(`root`)
);
