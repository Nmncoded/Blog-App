import React,{useState,useEffect} from 'react'; 
import {Link,NavLink,withRouter} from 'react-router-dom';
import url from './URL';


function Articles(props) {
    let [error,setError] = useState({message:""})

    useEffect(() => {
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
            // this.setState({articles:articles})
        })
        // .then(data => console.log(data.tags))
        .catch(console.error)
    },[])
    const handleDlte = (slug) => {
        let token = props.token;
        fetch(url.baseUrl + "/" + slug,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                authorization : `Token ${token}`
            }
        }).then(res => {
            if(!res.ok){
                return res.json().then(({errors}) => {
                    // console.log(data);
                    return Promise.reject("Check your fetch url, article not updated !!!")
                })
            }else{
                return res.json()
            }
        })
        .then((user) => {
            // console.log(user);
            
        })
        .catch(message => {
            // console.log(errors);
            setError(prev => error = {
                ...prev.error,
                message,
            })
        })
    }
        const {articles} = props;
        return (
            <>
                {
                    (articles.slice(0,10)).map((article,index) => {
                        
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
                                        <NavLink className='h3' to={`/articles/${article.slug}`} >{article.slug}</NavLink>
                                        <NavLink className='p' to={`/articles/${article.slug}`} >{article.description}</NavLink>
                                    </div>
                                    <div className='read-more flex-between-center'>
                                        <NavLink className='a' to={`/articles/${article.slug}`} >Read more...</NavLink>
                                        <div className='flex-between-center'>
                                            {
                                                article.tagList.map(p => {
                                                    return (
                                                        <NavLink to={`/articles/${article.slug}`} className='div' >{p}</NavLink>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    {
                                        props.update ? 
                                        <>
                                            <button className='button-shrink padding-margin'>
                                                <NavLink  style={{textDecoration:"none",color:"light-blue",fontSize:"16px"}} to={`/updatepost/${article.slug}`} >Edit</NavLink>
                                            </button>
                                            <button className='button-shrink padding-margin'>
                                            <NavLink to='/' onClick={() => handleDlte(article.slug)} style={{textDecoration:"none",color:"light-blue",fontSize:"16px"}} >Delete</NavLink>
                                            </button>
                                        </>
                                        :
                                        ""
                                    }
                                </div>
                            </li>
                        )
                    })
                }
            </>
        )
}

/* class Articles extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error:{
                message:"",
            }
        }
    }
    componentDidMount(){
        // const {activeTag} = this.props;
        // console.log(activeTag);
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
        // .then(data => console.log(data.tags))
        .catch(console.error)
    }
    handleDlte = (slug) => {
        let token = this.props.token;
        fetch(url.baseUrl + "/" + slug,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                authorization : `Token ${token}`
            }
        }).then(res => {
            if(!res.ok){
                return res.json().then(({errors}) => {
                    // console.log(data);
                    return Promise.reject("Check your fetch url, article not updated !!!")
                })
            }else{
                return res.json()
            }
        })
        .then((user) => {
            console.log(user);
            
        })
        .catch(message => {
            // console.log(errors);
            this.setState((prev) => {
                return {
                    
                    errors:{
                        ...prev.errors,
                        message,
                    }
                }
            })
        })
    }
    render(){
        const {articles} = this.props;
        // this.getData();
        
        return (
            <>
                {
                    (articles.slice(0,10)).map((article,index) => {
                        
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
                                        <NavLink className='h3' to={`/articles/${article.slug}`} >{article.slug}</NavLink>
                                        <NavLink className='p' to={`/articles/${article.slug}`} >{article.description}</NavLink>
                                    </div>
                                    <div className='read-more flex-between-center'>
                                        <NavLink className='a' to={`/articles/${article.slug}`} >Read more...</NavLink>
                                        <div className='flex-between-center'>
                                            {
                                                article.tagList.map(p => {
                                                    return (
                                                        <NavLink to={`/articles/${article.slug}`} className='div' >{p}</NavLink>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    {
                                        this.props.update ? 
                                        <>
                                            <button className='button-shrink padding-margin'>
                                                <NavLink  style={{textDecoration:"none",color:"light-blue",fontSize:"16px"}} to={`/updatepost/${article.slug}`} >Edit</NavLink>
                                            </button>
                                            <button className='button-shrink padding-margin'>
                                            <NavLink to='/' onClick={() => this.handleDlte(article.slug)} style={{textDecoration:"none",color:"light-blue",fontSize:"16px"}} >Delete</NavLink>
                                            </button>
                                        </>
                                        :
                                        ""
                                    }
                                </div>
                            </li>
                        )
                    })
                }
            </>
        )
    }
} */

/* function Loader(){
    return (
        <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
} */

export default Articles;