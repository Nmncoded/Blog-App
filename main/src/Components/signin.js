import React from 'react'; 
import '../Stylesheets/signin-styles/signin.css';
import {Link,NavLink} from 'react-router-dom';
import url from './URL';
import { withRouter } from 'react-router-dom';

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            errors:{
                email:"",
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
        let {email,password} = this.state;
        fetch(url.signInUrl,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user:{
                email,
                password,
                }
            })
        }).then(res => {
            if(!res.ok){
                res.json().then(({errors}) => {
                    return Promise.reject(errors)
                })
            }else{
                return res.json()
            }
        })
        .then(({user}) => {
            this.props.updateUser({
                ...user,
                password,
            });
            this.props.history.push('/');
        })
        .catch(errors => {
            this.setState((prev) => {
                return {
                    ...prev,
                    errors:{
                        ...prev.errors,
                        email:"email or password is invalid",
                    }
                }
            })
        })
    }
    render(){
        let errors = this.state.errors;
        let {email,password} = this.state;
        return (
            <section className='main-signin flex-center-center' >
                <h2>Sign In</h2>
                <p>
                    <Link to='/signup' className='nav-link' >Need an account?</Link>
                </p>
                <form onSubmit={this.handleInputSubmit} className='flex-center-center'>
                    <input type='text' className='email' value={email} onChange={this.handleInputChange} name="email" placeholder='Email'/>
                    <div className='errs'>{errors.email}</div>
                    <input type='password'  className='password' value={password}  onChange={this.handleInputChange} name="password" placeholder='Password'/>
                    <div className='errs'>{errors.password}</div>
                    <input type='submit' disabled={errors.email || errors.password || !email || !password} className='button-swing submit-btn'  value='Sign in' />
                </form>
            </section>
        )
    }
}

export default withRouter(Signin);