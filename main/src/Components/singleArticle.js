import React from 'react'; 
import url from './URL';
import '../Stylesheets/single-styles/singlestyle.css';
import {Link,NavLink} from 'react-router-dom';
import Loader from './loader';

class SingleArticle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            article:null,
            articlErr:"",
        };
    }
    componentDidMount(){
        let slug = this.props.match.params.slug;
        fetch(url.baseUrl + "/" + slug)
        .then(res => {
            // console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({article}) => {
            console.log(article);
            this.setState({article:article})
        })
        // .then(data => console.log(data.tags))
        .catch(err => {
            
            // console.log(err);
            
            this.setState({articlErr:err})
        })
    }
    render(){
        let {article} = this.state;
        if(!article){
            return <Loader />
        }
        return (
            <>
                <article className='single-article-hero'>
                    <section className='single-article container'>
                        <h1>{article.title}</h1>
                        <div className='person'>
                            <img src={article.author.image} alt={article.author.username}/>
                            <div className='name-date'>
                                <NavLink to='/' className='name'>{article.author.username}</NavLink>
                                <time dateTime='' className='date'>{(article.updatedAt.split("T"))[0]}</time>
                            </div>
                        </div>
                    </section>
                </article>
                <section className='main-single-article'>
                    <article className='container'>
                        <p>{article.body}</p>
                        <div className='taglist'>
                            {
                                article.tagList.map(p => {
                                    return (
                                        <span to={`/articles/${article.slug}`} className='div' >{p}</span>
                                    )
                                })
                            }
                        </div>
                        <div className='container' >
                            <section className='comments-section flex-center-center'>
                                <h6>
                                    <NavLink className='nav-link' to='/signin' >Signin</NavLink>
                                    or 
                                    <NavLink className='nav-link' to='/signup'  >Signup</NavLink>
                                    to add comments on this article.
                                </h6>
                                <div className='profile'>
                                    <p className='comments-text'>hello World</p>
                                    <div className='margin-bottom person'>
                                        <img src={article.author.image} alt={article.author.username}/>
                                        <div className='name-date'>
                                            <NavLink to='/' className='name'>{article.author.username}</NavLink>
                                            <time dateTime='' className='color date'>{(article.updatedAt.split("T"))[0]}</time>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </article>
                </section>
            </>
        )
    }
}



export default SingleArticle;