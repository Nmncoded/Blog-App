import React from 'react'; 
import '../Stylesheets/header-styles/header.css';
import {Link,NavLink} from 'react-router-dom';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        let {isLoggedin,user} = this.props;
        return (
            <header className='container'>
                <section className='header flex-between-center' >
                <div>
                    <NavLink to='/'  className='logo' >Conduit</NavLink>
                </div>
                {
                    isLoggedin ?
                    <AuthorisedUser isLoggedin={isLoggedin} /> : 
                    <NoAuthorisedUser />
                }
                </section>
            </header>
        )
    }
}

function AuthorisedUser(props){
    return(
        <div >
            <NavLink activeClassName='nav-active' className='nav-links' to='/' exact >Home</NavLink>
            <NavLink  activeClassName='nav-active'  className='nav-links' to='/newpost' >New Article</NavLink>
            <NavLink  activeClassName='nav-active'  className='nav-links' to='/settings' >Settings</NavLink>
            <NavLink  activeClassName='nav-active'  className='nav-links' to='/profile' >Profile</NavLink>
        </div>
    )
}
function NoAuthorisedUser(props){
    return(
        <div >
            <NavLink activeClassName='nav-active' className='nav-links' to='/' exact >Home</NavLink>
            <NavLink  activeClassName='nav-active'  className='nav-links' to='/signup' >Sign up</NavLink>
            <NavLink  activeClassName='nav-active'  className='nav-links' to='/signin' >Sign In</NavLink>
        </div>
    )
}

export default Header;