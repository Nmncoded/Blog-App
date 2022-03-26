import React from 'react'; 
// import '../hero-styles/hero.css';
import {Link,NavLink} from 'react-router-dom';
import '../Stylesheets/HOme-styles/Home-style.css'; 
import Hero from './hero.js'
import url from './URL';


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            articles:null,
        };
    }
    componentDidMount(){
        fetch(url.baseUrl)
        .then(res => {
            // console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({articles}) => {
            // console.log(articles);
            this.setState({articles:articles})
        })
        .catch(console.error)
    }
    render(){
        const {articles} = this.state;
        if(!this.state.articles){
            return <>
                <Hero />
                <Loader />
            </>
        }
        console.log(articles);
        return (
                <>
                    <Hero />
                    <article className='feeds-main container'>
                        <section className='feeds-tags'>
                            <ul className='feeds'>
                                <h2>
                                    <div className='global-feeds border-bottom'>
                                        <NavLink activeClassName='active' className='nav-link' to='/' exact >Global Feed</NavLink>
                                    </div>
                                </h2>
                            {
                                articles.map((article,index) => {
                                    return (
                                        <li key={index} >
                                            
                                            <div className='article'>
                                                <div className='personal-info flex-between-center'>
                                                    <div className='person'>
                                                        <img src={article.author.image} alt={article.author.username}/>
                                                        <div className='name-date'>
                                                            <span className='name'>{article.author.username}</span>
                                                            <span className='date'>{(article.updatedAt.split("T"))[0]}</span>
                                                        </div>
                                                    </div>
                                                    <div className='likes flex-between-center'>
                                                        <span className='dill'>♥</span>
                                                        <span>{article.favoritesCount}</span>
                                                    </div>
                                                </div>
                                                <div className='person-name'>
                                                    <NavLink className='h3' to='/'>{article.slug}</NavLink>
                                                    <NavLink className='p' to='/'>{article.description}</NavLink>
                                                </div>
                                                <div className='read-more flex-between-center'>
                                                    <NavLink className='a' to='/' >Read more...</NavLink>
                                                    <div>
                                                        {
                                                            article.tagList.map(p => {
                                                                return (
                                                                    <NavLink to='/' className='div' >{p}</NavLink>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                            </ul>
                            <div className='tags'>
                                <h4>Popular Tags</h4>
                                <ul className='all-tags'>
                                    {
                                        articles.map((article,index) => {
                                            return article.tagList.map(p => {
                                                return (
                                                    <li>{p}</li>
                                                )
                                            })
                                        })
                                    }
                                </ul>
                            </div>
                        </section>
                    </article>
                </>
        )
    }
}


function Loader(){
    return (
        <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Home;