import React,{useState,useEffect} from 'react';
import {NavLink,Link} from 'react-router-dom';
import url from './URL';
import Articles from './Articles';
import '../Stylesheets/profile-styles/profile.css'
import Loader from './loader'




function Profile(props) {
    // let [slugCount,setSlugCount] = useState(0);
    let [articles,setArticles] = useState(null);
    let [articlErr,setArticlErr] = useState("");
    let [query,setQuery] = useState("author");
    // let [sampleTag,setSampleTag] = useState("");
    let [articlePerPage,setArticlePerPage] = useState(10);
    let [offSet,setOffSet] = useState(0);

    useEffect(() => {
        let {username} = props.user;
            fetchData(url.baseUrl + (`?${query}=${username}&offset=${offSet}&limit=100`))
    },[query,offSet])
    
    const fetchData = (url) => {
            let {token} = props.user;
            
            fetch(url,{
                method: 'GET',
                headers:{
                    'Content-Type':'application/json',
                    authorization: `Token ${token}`,
                }
            })
            .then(res => {
                // console.log(res)
                if(!res.ok){
                    throw new Error("check your Url")
                }else{
                    return res.json()
                }
            })
            .then(({articles}) => {
                // console.log(data);
                setArticles(articles);
                // setSampleTag(sampleTag = "")
                // this.setState({articles,sampleTag:""})
            })
            // .then(data => console.log(data.tags))
            .catch(err => {
                setArticlErr(articlErr = err)
                // this.setState({articlErr:err})
            })
        }
        const handleFeedClick = (value) => {
            // fetchData(url.baseUrl + (`?${value}=${props.user.username}&offset=${offSet}&limit=100`))
            setQuery(query = value)
        }
        const getPagination = (articles,articlePerPage) => {
            let arr = [];
            for(let i =1; i<= Math.ceil(articles.length/articlePerPage) ;i++){
                arr.push(<li onClick={() => handleClick("",i,"num")}  className={(i - 1)*articlePerPage  === offSet ? 'button-shrink activ-bg-color' : 'button-shrink'} key={i} >{i}</li>)
            }
            return arr;
        }
        const handleClick = (name,value,num) => {
            if(value === "prev"){
                // setSampleTag(sampleTag = value);
                setOffSet(offSet = offSet - articlePerPage > 1 ? offSet - articlePerPage : 0)
            }
            if(value === "next"){
                // setSampleTag(sampleTag = value);
                setOffSet(offSet = offSet + articlePerPage <= articles.length ? offSet + 10 : offSet)
            }
            if(num === "num"){
                // setSampleTag(sampleTag = num);
                setOffSet(offSet = (value * articlePerPage) - articlePerPage <= articles.length ? (value * articlePerPage) - articlePerPage : offSet)
            }
        }
        // render(){
            let {image,username,bio,token} = props.user;
            // let {articles,query,articlErr,sampleTag,offSet,articlePerPage} = this.state;
            return(
            <>
                <section className='profile-hero-section'>
                    <article className='container'>
                        <div className='profile-hero'>
                            
                                <div className='img'>
                                    <img src={image} alt={username} />
                                </div>
                                <h2>{username}</h2>
                                <p>{bio}</p>
                            
                            <div className='profile-settings'>
                                <NavLink className="nav-link" to='/settings'>Edit profile Settings</NavLink>
                            </div>
                        </div>
                    </article>
                </section>
                <section>
                    <article className='container'>
                    <ul className='feeds padding'>
                            <section>
                                {
                                    // activeTag ? 
                                    <>
                                        <div onClick={() => handleFeedClick("author")} className={query !== "author" ? 'global-feeds' : 'global-feeds border-bottom'}>
                                            My feeds
                                        </div>
                                        <span  onClick={() => handleFeedClick("favorited")} className={ query === "favorited" ? 'global-feeds border-bottom' : 'global-feeds'}>
                                            Favorited Articles
                                        </span>
                                    </>
                                    
                                }
                            </section>
                            {
                                (articlErr) ? 
                                <>  
                                    <p className='err-msg' >Not able to fetch articles !!!</p>
                                    <Loader />
                                </>
                                :
                                (!articles) ? 
                                <Loader />
                                : 
                                (articles.length === 0 && query === "favorited") ? 
                                <p className='err-msg' >No favourites counted !!!</p>
                                :
                                (!articles && query === "author") ? 
                                <p className='err-msg' >No articles posted !!!</p>
                                :
                                <Articles token={token}  update={"update"}  articles={articles} />
                            }
                        </ul>
                        <section className='pagination flex-center-center'>
                                <button onClick={() => handleClick("","prev")} className=' font-size button-swing'>Prev</button>
                                <ul className='flex-center-center' >
                                {
                                    articles ? 
                                    getPagination(articles,articlePerPage)
                                    : 
                                    ""
                                }
                                </ul>
                                <button  onClick={() => handleClick("","next")}  className=' font-size button-swing'>Next</button>
                                </section>
                    </article>
                </section>
            </>
            )
        }
    // }


/* 
class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            slugCount:0,
            articles:null,
            articlErr:"",
            query:"author",
            sampleTag:"",
            articlePerPage: 10,
            offSet: 0,
        }
    }
    componentDidMount(){
        let {username,token} = this.props.user;
        this.fetchData(url.baseUrl + (`?${this.state.query}=${username}&offset=${this.state.offSet}&limit=100`))
    }
    componentDidUpdate(){
        const {sampleTag,slugCount} = this.state;
        if(!sampleTag)return;
        this.fetchData(url.baseUrl + (`?${this.state.query}=${this.props.user.username}&offset=${this.state.offSet}&limit=100`));
        // this.setState({slugCount:0})

    }
    fetchData = (url) => {
        let {username,token} = this.props.user;
        
        fetch(url,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                authorization: `Token ${token}`,
            }
        })
        .then(res => {
            // console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({articles}) => {
            // console.log(data);
            this.setState({articles,sampleTag:""})
        })
        // .then(data => console.log(data.tags))
        .catch(err => {
            this.setState({articlErr:err})
        })
    }
    handleFeedClick = (value) => {
        this.setState((prev) => {
            return {query:value}
        },() => {
            this.fetchData(url.baseUrl + (`?${this.state.query}=${this.props.user.username}&offset=${this.state.offSet}&limit=100`))
        })
    }
    getPagination = (articles,articlePerPage) => {
        let arr = [];
        for(let i =1; i<= Math.ceil(articles.length/articlePerPage) ;i++){
            arr.push(<li onClick={() => this.handleClick("",i,"num")}  className={(i - 1)*this.state.articlePerPage  === this.state.offSet ? 'button-shrink activ-bg-color' : 'button-shrink'} key={i} >{i}</li>)
        }
        return arr;
    }
    handleClick = (name,value,num) => {
        if(value === "prev"){
            this.setState((prev) => {
                return {
                    sampleTag: value,
                    offSet: this.state.offSet - this.state.articlePerPage > 1 ? this.state.offSet - this.state.articlePerPage : 0,
                }
            })
        }
        if(value === "next"){
            this.setState((prev) => {
                return {
                    sampleTag: value,
                    offSet: this.state.offSet + this.state.articlePerPage <= this.state.articles.length ? this.state.offSet + 10 : this.state.offSet,
                }
            })
        }
        if(num === "num"){
            this.setState((prev) => {
                return {
                    sampleTag: num,
                    offSet: (value * this.state.articlePerPage) - this.state.articlePerPage <= this.state.articles.length ? (value * this.state.articlePerPage) - this.state.articlePerPage : this.state.offSet,
                }
            })
        }
    }
    render(){
        let {image,username,bio,token} = this.props.user;
        let {articles,query,articlErr,sampleTag,offSet,articlePerPage} = this.state;
        return(
        <>
            <section className='profile-hero-section'>
                <article className='container'>
                    <div className='profile-hero'>
                        
                            <div className='img'>
                                <img src={image} alt={username} />
                            </div>
                            <h2>{username}</h2>
                            <p>{bio}</p>
                        
                        <div className='profile-settings'>
                            <NavLink className="nav-link" to='/settings'>Edit profile Settings</NavLink>
                        </div>
                    </div>
                </article>
            </section>
            <section>
                <article className='container'>
                <ul className='feeds padding'>
                        <section>
                            {
                                // activeTag ? 
                                <>
                                    <div onClick={() => this.handleFeedClick("author")} className={query !== "author" ? 'global-feeds' : 'global-feeds border-bottom'}>
                                        My feeds
                                    </div>
                                    <span  onClick={() => this.handleFeedClick("favorited")} className={ query === "favorited" ? 'global-feeds border-bottom' : 'global-feeds'}>
                                        Favorited Articles
                                    </span>
                                </>
                                
                            }
                        </section>
                        {
                            (articlErr) ? 
                            <>  
                                <p className='err-msg' >Not able to fetch articles !!!</p>
                                <Loader />
                            </>
                            :
                            (!articles) ? 
                            <Loader />
                            : 
                            (articles.length === 0 && query === "favorited") ? 
                            <p className='err-msg' >No favourites counted !!!</p>
                            :
                            (!articles && query === "author") ? 
                            <p className='err-msg' >No articles posted !!!</p>
                            :
                            <Articles token={token}  update={"update"}  articles={articles} />
                        }
                    </ul>
                    <section className='pagination flex-center-center'>
                            <button onClick={() => this.handleClick("","prev")} className=' font-size button-swing'>Prev</button>
                            <ul className='flex-center-center' >
                            {
                                articles ? 
                                this.getPagination(articles,articlePerPage)
                                : 
                                ""
                            }
                            </ul>
                            <button  onClick={() => this.handleClick("","next")}  className=' font-size button-swing'>Next</button>
                            </section>
                </article>
            </section>
        </>
        )
    }
}
 */
export default Profile;