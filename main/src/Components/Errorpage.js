import React from 'react'; 
import '../Stylesheets/hero-styles/hero.css';

function ErrorPage(){
    return (
        <article className='main-hero'>
            <section className='hero container flex-center-center'>
                <h1>404 Error</h1>
                <p>Page not found</p>
            </section>
        </article>
    )
}

export default ErrorPage;