import React from 'react';
import url from './URL';
import '../Stylesheets/settings-styles/settings.css';
import {withRouter} from 'react-router-dom';

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state={
            imageUrl:"",
            username:"",
            email:"",
            password:"",
            bio:"",
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
        /* fetch(url.userVerifyURL,{
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
                    return Promise.reject("Check your fetch url, user not updated !!!")
                })
            }else{
                return res.json()
            }
        })
        .then(({user}) => {
            // console.log(user);
            // this.props.updateUser(user);
            // this.props.history.push('/');
        })
        .catch(message => {
            // console.log(errors);
            this.setState((prev) => {
                return {
                    
                    errors:{
                        ...prev.errors,
                        message,
                    }
                }
            })
        }) */
    }
    render(){
        let {imageUrl,username,email,password,bio,errors} = this.state;
        return (
            <section className='main-signin newpost flex-center-center' >
                <h2>Settings</h2>
                <form onSubmit={this.handleInputSubmit} className='flex-center-center'>
                    <input type='text' className='email' value={imageUrl} onChange={this.handleInputChange} name="imageUrl" placeholder='Url of profile picture'/>
                    <div className='errs'>{errors.imageUrl}</div>
                    <input type='text'  className='password' value={username}  onChange={this.handleInputChange} name="username" placeholder={`Username`}/>
                    <div className='errs'>{errors.username}</div>
                    <textarea rows={10} className='email' value={bio} onChange={this.handleInputChange} name='bio' placeholder='Your bio...' ></textarea>
                    <input type='text'  className='password' value={email}  onChange={this.handleInputChange} name="email" placeholder="Email" />
                    <div className='errs'>{errors.email}</div>
                    <input type='password'  className='password' value={password}  onChange={this.handleInputChange} name="password" placeholder="New password" />
                    <div className='errs'>{errors.password}</div>
                    <input type='submit'  className='button-swing submit-btn'  value='Update Settings' />
                </form>
            </section>
        )
    }
}

export default withRouter(Settings);