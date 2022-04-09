import React,{useState,useEffect,useContext} from 'react'; 
import url from './URL';
import '../Stylesheets/single-styles/singlestyle.css';
import {Link,NavLink,withRouter} from 'react-router-dom';
import Loader from './loader';
import UserContext from './userContext';

/*
class SingleArticle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            comments:null,
            comment: {},
            article : null,
            articlErr:"",
            textarea:"",
            moreComments: false,
            isFollowed:false,
        };
    }

    handleMoreComments = () => {
        this.setState((prev) => {
            return {
                moreComments: !prev.moreComments,
            }
        })
    }

    handleFollowClick = () => {
        // let {token,username} = this.props.user;
        // let isFollowed = this.state.isFollowed;
        this.setState((prev) => {
            return {
                isFollowed: !prev.isFollowed,
            }
        })
    }

    fetchFollowData = () => {
        let {token,username} = this.props.user;
        let isFollowed = this.state.isFollowed;
        fetch(url.profileUrl  + `/${username}/follow`,{
            method: isFollowed ? 'DELETE' : 'POST',
            headers:{
                'Content-Type': 'application/json',
                authorization: `Token ${token}`
            },

        })
        .then(res => {
            // console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({profile}) => {
            console.log(profile.following);
            this.setState((prev) => {
                return {
                    isFollowed: profile.following,
                }
            })
            localStorage.setItem("isFollowed" , JSON.stringify(profile.following))  
            // this.setState({comments})
        })
        // .then(data => console.log(data.tags))
        .catch(err => {
            
            // console.log(err);
            
            this.setState({articlErr:err})
        })
    }
    handleDeleteComment = (id) => {
        // console.log(id);
        let slug = this.props.match.params.slug;
        this.fetchData(url.baseUrl + "/" + slug + `/comments/${id}`,'DELETE');
        this.setState({
            comments: this.state.comments.filter(c => c.id !== id)
        })
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
            this.setState({article:article,isFollowed: JSON.parse(localStorage.getItem("isFollowed"))})
        })
        // .then(data => console.log(data.tags))
        .catch(err => {
            
            // console.log(err);
            
            this.setState({articlErr:err})
        })
        this.fetchData(url.baseUrl + "/" + slug + "/comments",'GET');
        
    }
    handleChange = ({target}) => {
        let {name,value} = target;
        
        this.setState({
            [name]: value,
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let slug = this.props.match.params.slug;
        let token = this.props.user.token;
        fetch(url.baseUrl + "/" + slug + "/comments",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                authorization: `Token ${token}`
            },
            body: JSON.stringify({
                comment:{
                    body:this.state.textarea,
                }
            })
        })
        .then(res => {
            // console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({comment}) => {
            console.log(comment);
            this.setState({comment,textarea:"",comments:null})
        })
        // .then(data => console.log(data.tags))
        .catch(err => {
            
            // console.log(err);
            
            // this.setState({articlErr:err})
        })
    }
    fetchData = (url,request) => {
        // let slug = this.props.match.params.slug;
        let token = this.props.user.token;
        fetch(url,{
            method: request,
            headers:{
                'Content-Type': 'application/json',
                authorization: `Token ${token}`
            },

        })
        .then(res => {
            // console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({comments}) => {
            console.log(comments);
            this.setState({comments})
        })
        // .then(data => console.log(data.tags))
        .catch(err => {
            
            // console.log(err);
            
            // this.setState({articlErr:err})
        })
    }
    componentWillUnmount(){
        localStorage.setItem("isFollowed",this.state.isFollowed);
    }
    componentDidUpdate(prevProps,prevState){
        // JSON.parse(localStorage.getItem("isFollowed"));

        // console.log(prevState, this.state);
        // console.log(prevState.comment.id , this.state.comment.id);
        if(prevState.comment.id !== this.state.comment.id){
            console.log("updated")

        let slug = this.props.match.params.slug;
        let token = this.props.user.token;
        this.fetchData(url.baseUrl + "/" + slug + "/comments",'GET');
        }
        
    }
    
    
    // static contextType = UserContext;
    

    render(){
        // console.log(this.context);
        let {article,comments,isFollowed} = this.state;
        if(!article){
            return <Loader />
        }
        return (
            <>
                <article className='single-article-hero'>
                    <section className='single-article container'>
                        <h1>{article.title}</h1>
                        <div className='person apdding'>
                            <img src={article.author.image} alt={article.author.username}/>
                            <div className='name-date'>
                                <NavLink to='/' className='name'>{article.author.username}</NavLink>
                                <time dateTime='' className='date clr-white'>{(article.updatedAt.split("T"))[0]}</time>
                            </div>
                            <button onClick={this.fetchFollowData} className='button-swing follow-btn' >{isFollowed ? '-Unfollow' : '+Follow'}</button>
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
                                {
                                    !this.context.isLoggedin ? 
                                    <h6>
                                    <NavLink className='nav-link' to='/signin' >Signin</NavLink>
                                    or 
                                    <NavLink className='nav-link' to='/signup'  >Signup</NavLink>
                                    to add comments on this article.
                                    </h6> : 
                                    <>
                                    
                                    
                                <form className='form'>
                                    <textarea  className='text-area' onChange={this.handleChange} name='textarea' value={this.state.textarea} rows='2' placeholder='write comments...' ></textarea>
                                    <input type='submit' onClick={this.handleSubmit} value='Post' />
                                </form>
                                <ul className='comments-ul'>
                                    {
                                        !comments ? <Loader /> : 
                                        (this.state.moreComments ? comments : comments.slice(0,3)).map(comment => {
                                            return(
                                                <li key={comment.id} className='profile'>
                                                    <p className='comments-text'>{comment.body}</p>
                                                    <div className='margin-bottom person'>
                                                        <img src={comment.author.image} alt={comment.author.username}/>
                                                        <div className='name-date'>
                                                            <NavLink to='/' className='name'>{comment.author.username}</NavLink>
                                                            <time dateTime='' className='color date'>{(comment.createdAt.split("T"))[0]}</time>
                                                        </div>
                                                    </div>
                                                    <button className='align-self button-swing' onClick={() => this.handleDeleteComment(comment.id)} >Delete</button>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                {
                                    !comments ? "" : 
                                <button className={comments.length === 0  ? 'display-none' : 'button-shrink a-padding'}  onClick={this.handleMoreComments} >{!this.state.moreComments ? "More comments" : "less comments"}</button>
                                }
                                </>
                                }
                            </section>
                        </div>
                    </article>
                </section>
            </>
        )
    }
}
 */

function SingleArticle(props) {
    let [comments,setComments] = useState(null);
    let [comment,setComment] = useState({});
    let [article,setArticle] = useState(null);
    let [articlErr,setArticlErr] = useState("");
    let [textArea,setTextArea] = useState("");
    let [moreComments,setMoreComments] = useState(false);
    let [isFollowed,setIsFollowed] = useState(false);
    let user = useContext(UserContext);
    // console.log(user)
    useEffect(() => {
        let slug = props.match.params.slug;
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
            setArticle(article)
        })
        .catch(error => {
        })
        if(user.isLoggedin){
            fetchData(url.baseUrl + "/" + slug + "/comments",'GET');
        }
    },[comment.id])

    
    const fetchData = (url,request) => {
        console.log(props);
        console.log("fetch-data");
        let token = props.user.token;
        fetch(url,{
            method: request,
            headers:{
                'Content-Type': 'application/json',
                authorization: `Token ${token}`
            },
        })
        .then(res => {
            console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                // console.log(res); 
                return res.json()
            }
        })
        .then(({comments}) => {
            console.log(comments)
            setComments(comments);
        })
        .catch(err => {
            console.log(err)
            // setArticlErr(err)
        })
    }

    const handleMoreComments = () => {
        setMoreComments(!moreComments);
    }

    const handleFollowClick = () => {
        setIsFollowed(!isFollowed)
    }

    const fetchFollowData = () => {
        let {token,username} = props.user;
        fetch(url.profileUrl  + `/${username}/follow`,{
            method: isFollowed ? 'DELETE' : 'POST',
            headers:{
                'Content-Type': 'application/json',
                authorization: `Token ${token}`
            },

        })
        .then(res => {
            // console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({profile}) => {
            setIsFollowed(isFollowed =  profile.following)
        })
        .catch(err => {
            
            // console.log(err);
            
            setArticlErr(articlErr = err)
        })
    }

    const handleDeleteComment = (id) => {
        console.log(id)
        let slug = props.match.params.slug;
        fetchData(url.baseUrl + "/" + slug + `/comments/${id}`,'DELETE');
        setComments(comments = comments.filter(c => c.id !== id))
    }

    const handleChange = ({target}) => {
        let {name,value} = target;
        setTextArea(name = value);
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        let slug = props.match.params.slug;
        let token = props.user.token;
        fetch(url.baseUrl + "/" + slug + "/comments",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                authorization: `Token ${token}`
            },
            body: JSON.stringify({
                comment:{
                    body: textArea,
                }
            })
        })
        .then(res => {
            // console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({comment}) => {
            // console.log(comment);
            setComment(comment);
            setTextArea(textArea = "");
            setComments(comments = null)
        })
    }

        if(!article){
            return <Loader />
        }
        return (
            <>
                <article className='single-article-hero'>
                    <section className='single-article container'>
                        <h1>{article.title}</h1>
                        <div className='person apdding'>
                            <img src={article.author.image} alt={article.author.username}/>
                            <div className='name-date'>
                                <NavLink to='/' className='name'>{article.author.username}</NavLink>
                                <time dateTime='' className='date clr-white'>{(article.updatedAt.split("T"))[0]}</time>
                            </div>
                            <button onClick={fetchFollowData} className='button-swing follow-btn' >{isFollowed ? '-Unfollow' : '+Follow'}</button>
                        </div>
                    </section>
                </article>
                <section className='main-single-article'>
                    <article className='container'>
                        <p>{article.body}</p>
                        <div className='taglist'>
                            {
                                article.tagList.map((p,index) => {
                                    return (
                                        <span key={index}  to={`/articles/${article.slug}`} className='div' >{p}</span>
                                    )
                                })
                            }
                        </div>
                        <div className='container' >
                            <section className='comments-section flex-center-center'>
                                {
                                    !user.isLoggedin ? 
                                    <h6>
                                    <NavLink className='nav-link' to='/signin' >Signin</NavLink>
                                    or 
                                    <NavLink className='nav-link' to='/signup'  >Signup</NavLink>
                                    to add comments on this article.
                                    </h6> : 
                                    <>
                                    
                                    
                                <form className='form'>
                                    <textarea  className='text-area' onChange={handleChange} name='textarea' value={textArea} rows='2' placeholder='write comments...' ></textarea>
                                    <input type='submit' onClick={handleSubmit} value='Post' />
                                </form>
                                <ul className='comments-ul'>
                                    {
                                        !comments ? <Loader /> : 
                                        comments.length === 0 ? <p className='err-msg' >Add comments !!!</p> : 
                                        (moreComments ? comments : comments.slice(0,3)).map(cmnt => {
                                            return(
                                                <li key={cmnt.id} className='profile'>
                                                    <p className='comments-text'>{cmnt.body}</p>
                                                    <div className='margin-bottom person'>
                                                        <img src={cmnt.author.image} alt={cmnt.author.username}/>
                                                        <div className='name-date'>
                                                            <NavLink to='/' className='name'>{cmnt.author.username}</NavLink>
                                                            <time dateTime='' className='color date'>{(cmnt.createdAt.split("T"))[0]}</time>
                                                        </div>
                                                    </div>
                                                    <button className='align-self button-swing' onClick={() => handleDeleteComment(cmnt.id)} >Delete</button>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                {
                                    !comments ? "" : 
                                <button className={comments.length === 0  ? 'display-none' : 'button-shrink a-padding'}  onClick={handleMoreComments} >{!moreComments ? "More comments" : "less comments"}</button>
                                }
                                </>
                                }
                            </section>
                        </div>
                    </article>
                </section>
            </>
        )
    }
// }

export default withRouter(SingleArticle);