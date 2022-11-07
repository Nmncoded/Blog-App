import React, { useState } from 'react';
import url from './URL';
import '../Stylesheets/settings-styles/settings.css';
import {withRouter,NavLink, RouteComponentProps} from 'react-router-dom';
import { similarProps } from './typesDefined';

type comProps = RouteComponentProps & similarProps

function Settings(props:comProps):JSX.Element {
    let [imageUrl,setImageUrl] = useState("");
    let [username,setUsername] = useState(props.user?.username);
    let [email,setEmail] = useState(props.user?.email);
    let [password,setPassword] = useState(props.user?.password);
    let [bio,setBio] = useState(props.user?.bio);
    let [errors,setErrors] = useState({
        username:"",
        email:"",
        password:"",
        imageUrl:"",
    });
    const validateImageurl = (value:string) => {
        let re = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/;
        return re.test(value);
    }
    const validateEmail = (email:string) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    const validatePassword = (password:string) => {
        let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    }
    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const {name,value} = e.target;

        switch(name){
            case "email": errors.email  = validateEmail(value) ? "" : "Email is not valid"
                break;
            case "password": errors.password  = validatePassword(value) ? "" : "Minimum eight characters, at least one letter and one number"
                break;
            case "username": errors.username  = value.length >= 6 ? "" : "Username should be at-least 6 characters long"
                break;
            case "imageUrl": errors.imageUrl  = validateImageurl(value) ? "" : `Email url should contain ${`(jpg|jpeg|png|gif)`} !!!`
                break;
            default:
                break;
        }

        setErrors(errors);

        if(name === "bio"){
            setBio(bio = value)
        }
        if(name === "imageUrl"){
            setImageUrl(imageUrl = value)
        }
        if(name === "email"){
            setEmail(email = value)
        }
        if(name === "password"){
            setPassword(password = value)
        }
        if(name === "username"){
            setUsername(username = value)
        }

    }
    const handleInputSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        fetch(url.userVerifyURL,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                authorization : `Token ${props.user?.token}`
            },
            body: JSON.stringify({
                user:{
                email,
                bio,
                username,
                password,
                image:imageUrl,
                }
            })
        }).then(res => {
            if(!res.ok){
                return res.json().then(({errors}) => {
                    return Promise.reject(errors)
                })
            }else{
                return res.json()
            }
        })
        .then(({user}) => {
            props.history.push('/');
            props?.updateUser({
                ...user,
                password,
            });
            
        })
        .catch((errors) => {
            setErrors(errors);
        })
    }
    
        return (
            <section className='main-signin newpost flex-center-center' >
                <h2>Settings</h2>
                <h3  className='button-shrink' style={{padding: "4px"}} ><NavLink to='/'  style={{textDecoration:"none"}} onClick={() =>props.handleLogout("logout")} >Logout</NavLink></h3>
                <form onSubmit={handleInputSubmit} className='flex-center-center'>
                    <input type='text' className='email' value={imageUrl} onChange={handleInputChange} name="imageUrl" placeholder='Url of profile picture'/>
                    <div className='errs'>{errors.imageUrl}</div>
                    <input type='text'  className='password' value={username}  onChange={handleInputChange} name="username" placeholder={`Username (mandatory field)`}/>
                    <div className='errs'>{errors.username}</div>
                    <textarea rows={10} className='email' value={bio} onChange={handleInputChange} name='bio' placeholder='Your bio...' ></textarea>
                    <input type='text'  className='password' value={email}  onChange={handleInputChange} name="email" placeholder="Email (mandatory field)" />
                    <div className='errs'>{errors.email}</div>
                    <input type='password'  className='password' value={password}  onChange={handleInputChange} name="password" placeholder="New password (mandatory field)" />
                    <div className='errs'>{errors.password}</div>
                    <input type='submit'  disabled={!username || !email || !password} className='button-swing submit-btn'  value='Update Settings' />
                </form>
            </section>
        )
    // }
}

export default withRouter(Settings);

/* class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state={
            imageUrl:"",
            username:this.props.user.username,
            email:this.props.user.email,
            password:this.props.user.password,
            bio:this.props.user.bio,
            errors:{
                username:"",
                email:"",
                password:"",
                imageUrl:"",
            }
        }
    }
    validateImageurl = (value) => {
        let re = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/;
        return re.test(value);
    }
    validateEmail = (email) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    validatePassword = (password) => {
        let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    }
    handleInputChange = ({target}) => {
        const {name,value} = target;
        let errors = this.state.errors;

        switch(name){
            case "email": errors.email  = this.validateEmail(value) ? "" : "Email is not valid"
                break;
            case "password": errors.password  = this.validatePassword(value) ? "" : "Minimum eight characters, at least one letter and one number"
                break;
            case "username": errors.username  = value.length >= 6 ? "" : "Username should be at-least 6 characters long"
                break;
            case "imageUrl": errors.imageUrl  = this.validateImageurl(value) ? "" : `Email url should contain ${`(jpg|jpeg|png|gif)`} !!!`
                break;
            default:
                break;
        }

        this.setState({
            [name]:value,
            errors,
        })
    }
    handleInputSubmit = (event) => {
        event.preventDefault();
        let {imageUrl,username,email,password,bio} = this.state;
        // alert(title + description + body + tags)
        fetch(url.userVerifyURL,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                authorization : `Token ${this.props.user.token}`
            },
            body: JSON.stringify({
                user:{
                email,
                bio,
                username,
                password,
                image:imageUrl,
                }
            })
        }).then(res => {
            if(!res.ok){
                return res.json().then(({errors}) => {
                    // console.log(data);
                    return Promise.reject(errors)
                })
            }else{
                return res.json()
            }
        })
        .then(({user}) => {
            // console.log(user);
            this.props.history.push('/');
            this.props.updateUser({
                ...user,
                password,
            });
            
        })
        .catch((errors) => {
            // console.log(errors);
            this.setState((prev) => {
                return {
                    errors,
                }
            })
        })
    }
    
    render(){
        // console.log(this.props.user);
        let {imageUrl,username,email,password,bio,errors} = this.state;
        return (
            <section className='main-signin newpost flex-center-center' >
                <h2>Settings</h2>
                <h3  className='button-shrink' style={{padding: "4px"}} ><NavLink to='/'  style={{textDecoration:"none"}} onClick={() =>this.props.handleLogout("logout")} >Logout</NavLink></h3>
                <form onSubmit={this.handleInputSubmit} className='flex-center-center'>
                    <input type='text' className='email' value={imageUrl} onChange={this.handleInputChange} name="imageUrl" placeholder='Url of profile picture'/>
                    <div className='errs'>{errors.imageUrl}</div>
                    <input type='text'  className='password' value={username}  onChange={this.handleInputChange} name="username" placeholder={`Username (mandatory field)`}/>
                    <div className='errs'>{errors.username}</div>
                    <textarea rows={10} className='email' value={bio} onChange={this.handleInputChange} name='bio' placeholder='Your bio...' ></textarea>
                    <input type='text'  className='password' value={email}  onChange={this.handleInputChange} name="email" placeholder="Email (mandatory field)" />
                    <div className='errs'>{errors.email}</div>
                    <input type='password'  className='password' value={password}  onChange={this.handleInputChange} name="password" placeholder="New password (mandatory field)" />
                    <div className='errs'>{errors.password}</div>
                    <input type='submit'  disabled={!username || !email || !password} className='button-swing submit-btn'  value='Update Settings' />
                </form>
            </section>
        )
    }
} */

