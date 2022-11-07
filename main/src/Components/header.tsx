import React from 'react'; 
import '../Stylesheets/header-styles/header.css';
import {NavLink} from 'react-router-dom';
import { headerProps } from './typesDefined';


function Header({isLoggedin}:headerProps):JSX.Element {
        return (
            <header className='container'>
                <section className='header flex-between-center' >
                <div>
                    <NavLink to='/'  className='logo' >Conduit</NavLink>
                </div>
                
                <label htmlFor='toggle' id='bars' >
                <div className="hamburger-menu">
                    <div className="bar top"></div>
                    <div className="bar middle"></div>
                    <div className="bar bottom"></div>
                </div>
                </label>
                <input type='checkbox' id='toggle' />
                {
                    isLoggedin ?
                    <AuthorisedUser />
                    
                    : 
                    <NoAuthorisedUser />
                }

                </section>
            </header>
        )
}

function AuthorisedUser():JSX.Element{
    return(
        <div className='nav-menu' >
            <NavLink activeClassName='nav-active' className='nav-links' to='/' exact >Home</NavLink>
            <NavLink  activeClassName='nav-active'  className='nav-links' to='/newpost' >New Article</NavLink>
            <NavLink  activeClassName='nav-active'  className='nav-links' to='/settings' >Settings</NavLink>
            <NavLink  activeClassName='nav-active'  className='nav-links' to='/profile' >Profile</NavLink>
        </div>
    )
}
function NoAuthorisedUser():JSX.Element{
    return(
        <div className='nav-menu'  >
            <NavLink activeClassName='nav-active' className='nav-links' to='/' exact >Home</NavLink>
            <NavLink  activeClassName='nav-active'  className='nav-links' to='/signup' >Sign up</NavLink>
            <NavLink  activeClassName='nav-active'  className='nav-links' to='/signin' >Sign In</NavLink>
        </div>
    )
}

export default Header;