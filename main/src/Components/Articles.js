import React from 'react'; 
import {Link,NavLink} from 'react-router-dom';
import url from './URL';

class Articles extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // articles:null,
        }
    }
    componentDidMount(){
        // const {activeTag} = this.props;
        // console.log(activeTag);
        fetch(url.baseUrl)
        .then(res => {
            console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({articles}) => {
            console.log(articles);
            this.setState({articles:articles})
        })
        // .then(data => console.log(data.tags))
        .catch(console.error)
    }
    /* componentDidUpdate(){
        // console.log("update articles")
        const {activeTag} = this.props;
        console.log(activeTag);
        fetch(url.baseUrl + (activeTag ? `?tag=${activeTag}`:""))
        .then(res => {
            console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({articles}) => {
            console.log(articles);
            this.setState({articles:articles})
        })
        // .then(data => console.log(data.tags))
        .catch(console.error)
    } */
    render(){
        const {articles} = this.props;
        // this.getData();
        
        return (
            <>
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
                                        <div className='flex-between-center'>
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
            </>
        )
    }
}

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