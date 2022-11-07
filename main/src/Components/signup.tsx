import React,{useState,useEffect} from 'react'; 
import '../Stylesheets/signup-styles/signup.css';
import {Link,NavLink, RouteComponentProps} from 'react-router-dom';
import url from './URL'
import { withRouter } from 'react-router-dom';
import { signupProps } from './typesDefined';

type commonProps = RouteComponentProps & signupProps

function Signup(props:commonProps):JSX.Element {
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [username,setUsername] = useState("");
    let [errors,setErrors] = useState({
        email:"",
        password:"",
        username:"",
    });
    const validateEmail = (email:string) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    const validatePassword = (password:string) => {
        let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    }
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const {name,value} = e.target;

        switch(name){
            case "email": errors.email  = validateEmail(value) ? "" : "Email is not valid"
                break;
            case "password": errors.password  = validatePassword(value) ? "" : "Minimum eight characters, at least one letter and one number"
                break;
            case "username": errors.username  = value.length >= 6 ? "" : "Username should be at-least 6 characters long"
                break;
            default:
                break;
        }
        setErrors(errors);
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
        fetch(url.signUpUrl,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user:{
                username,
                email,
                password,
                }
            })
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
            props.updateUser({
                ...user,
                password,
            });
            props.history.push('/');
        })
        .catch(errors => setErrors(errors = {
            ...errors,
            username: "Something went wrong. Please try after some time!!!",
        }))
    }
        return (
            <section className='main-signup flex-center-center' >
                <h2>Sign Up</h2>
                <p>
                    <Link to='/signin' className='nav-link' >Have an account?</Link>
                </p>
                <form  onSubmit={handleInputSubmit}  className='flex-center-center'>
                    <input type='text'  className='username' value={username}  onChange={handleInputChange} name="username" placeholder='Username'/>
                    <div className='errs'>{errors.username}</div>
                    <input type='text' className='email' value={email} onChange={handleInputChange} name="email" placeholder='Email'/>
                    <div className='errs'>{errors.email}</div>
                    <input type='password'  className='password' value={password}  onChange={handleInputChange} name="password" placeholder='Password'/>
                    <div className='errs'>{errors.password}</div>
                    <input type='submit' className='button-swing submit-btn'disabled={(errors.email && true) || (errors.password && true) || (errors.username && true) || !email || !password || !username} onChange={handleInputSubmit} value='Sign up' />
                </form>
            </section>
        )
}
export default withRouter(Signup);

/* class Signup extends React.Component {
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
        let {username,email,password} = this.state;
        event.preventDefault();
        fetch(url.signUpUrl,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user:{
                username,
                email,
                password,
                }
            })
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
            this.props.updateUser({
                ...user,
                password,
            });
            this.props.history.push('/');
            // this.setState({username:"",email:"",password:""})
        })
        .catch(errors => this.setState({errors}))
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
                    <input type='submit' className='button-swing submit-btn'disabled={errors.email || errors.password || errors.username || !email || !password || !username} onChange={this.handleInputSubmit} value='Sign up' />
                </form>
            </section>
        )
    }
} */