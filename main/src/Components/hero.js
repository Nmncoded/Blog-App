import React from 'react'; 
import '../Stylesheets/hero-styles/hero.css';
import {Link,NavLink} from 'react-router-dom';

class Hero extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <article className='main-hero'>
                <section className='hero container flex-center-center'>
                    <h1>Conduit</h1>
                    <p>A place to share your knowledge</p>
                </section>
            </article>
        )
    }
}

export default Hero;