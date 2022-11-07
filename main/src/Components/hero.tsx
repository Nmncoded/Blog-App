import React from 'react'; 
import '../Stylesheets/hero-styles/hero.css';

function Hero():JSX.Element {
        return (
            <article className='main-hero'>
                <section className='hero container flex-center-center'>
                    <h1>Conduit</h1>
                    <p>A place to share your knowledge</p>
                </section>
            </article>
        )
}

export default Hero;