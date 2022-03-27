import React from 'react'; 
import '../Stylesheets/signup-styles/signup.css';
import {Link,NavLink} from 'react-router-dom';

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            username:"",
            errors:{
                email:"",
                username:"",
                password:"",
            }
        };
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
        alert(this.state.email + this.state.password + this.state.username);
    }
    render(){
        let errors = this.state.errors;
        let {email,password,username} = this.state;
        return (
            <section className='main-signup flex-center-center' >
                <h2>Sign Up</h2>
                <p>
                    <Link to='/signin' className='nav-link' >Have an account?</Link>
                </p>
                <form  onSubmit={this.handleInputSubmit}  className='flex-center-center'>
                    <input type='text'  className='username' value={username}  onChange={this.handleInputChange} name="username" placeholder='Username'/>
                    <div className='errs'>{errors.username}</div>
                    <input type='text' className='email' value={email} onChange={this.handleInputChange} name="email" placeholder='Email'/>
                    <div className='errs'>{errors.email}</div>
                    <input type='password'  className='password' value={password}  onChange={this.handleInputChange} name="password" placeholder='Password'/>
                    <div className='errs'>{errors.password}</div>
                    <input type='submit' className='button-swing submit-btn'disabled={errors.email || errors.password || errors.username || !email || !password || !username} onClick={this.handleInputSubmit} value='Sign up' />
                </form>
            </section>
        )
    }
}

export default Signup;