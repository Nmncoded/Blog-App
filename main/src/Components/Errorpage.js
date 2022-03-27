import React from 'react'; 
import '../Stylesheets/hero-styles/hero.css';
import {Link,NavLink} from 'react-router-dom';

class ErrorPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <article className='main-hero'>
                <section className='hero container flex-center-center'>
                    <h1>404 Error</h1>
                    <p>Page not found</p>
                </section>
            </article>
        )
    }
}

export default ErrorPage;