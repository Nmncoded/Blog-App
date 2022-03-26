import React from 'react'; 
import '../Stylesheets/header-styles/header.css';
import {Link,NavLink} from 'react-router-dom';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <header className='container'>
                <section className='header flex-between-center' >
                <div>
                    <NavLink to='/'  className='logo' >Conduit</NavLink>
                </div>
                <div >
                    <NavLink activeClassName='nav-active' className='nav-links' to='/' exact >Home</NavLink>
                    <NavLink  activeClassName='nav-active'  className='nav-links' to='/signup' >Sign up</NavLink>
                    <NavLink  activeClassName='nav-active'  className='nav-links' to='/signin' >Sign In</NavLink>
                </div>
                </section>
            </header>
        )
    }
}

export default Header;