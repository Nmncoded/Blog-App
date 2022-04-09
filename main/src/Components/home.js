import React,{useState,useEffect} from 'react'; 
import {Link,NavLink} from 'react-router-dom';
import url from './URL';
import Articles from './Articles';
import Hero from './hero.js';
import '../Stylesheets/HOme-styles/Home-style.css'; 
import Tags from './Tags.js';
import Loader from './loader';

function Home(props) {
    let articlePerPage = 10;
    let [activeTag,setActiveTag] = useState("");
    let [articles,setArticles] = useState(null);
    let [allTags,setAllTags] = useState(null);
    let [offSet,setOffSet] = useState(0);
    let [articlErr,setArticlErr] = useState("");
    let [tagErr,setTagErr] = useState("");

    useEffect(() => {
        fetch(activeTag ? url.baseUrl + (`?tag=${activeTag}&offset=${offSet}`) : url.baseUrl + (`?offset=${offSet}&limit=100`))
        .then(res => {
            // console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({articles}) => {
            setArticles(articles);
        })
        .catch(err => {
            setArticlErr(err);
        })

        fetch(url.tagsUrl)
        .then(res => {
            // console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({tags}) => {
            let arr = tags.reduce((acc,cv) => {
                if(!acc.includes(cv)){
                    acc.push(cv);
                }
                return acc;
            },[])
            setAllTags(arr);
        })
        .catch(err => {
            setTagErr(err);
        })
    },[activeTag,offSet])

    const handleClick = (name,value,num) => {
        // console.log(name)
        if(value === "tags"){
            setActiveTag(activeTag = name);
            setArticles(articles = null);
        }
        if(value === "feeds"){
            setActiveTag(activeTag = "");
            setArticles(articles = null);
        }
        if(value === "prev"){
            setOffSet(offSet = offSet - articlePerPage > 1 ? offSet - articlePerPage : 0)
        }
        if(value === "next"){
            setOffSet(offSet = offSet + articlePerPage <= articles.length ? offSet + 10 : offSet)
        }
        if(num === "num"){
            setOffSet(offSet = (value * articlePerPage) - articlePerPage <= articles.length ? (value * articlePerPage) - articlePerPage : offSet)
        }
    }
    
    const getPagination = (articles,articlePerPage) => {
        let arr = [];
        for(let i =1; i<= Math.ceil(articles.length/articlePerPage) + 1;i++){
            arr.push(<li onClick={() => handleClick("",i,"num")}  className={(i - 1) * articlePerPage  === offSet ? 'button-shrink activ-bg-color' : 'button-shrink'} key={i} >{i}</li>)
        }
        return arr;
    }
        return (
                <>
                    <Hero />
                    <article className='feeds-main container'>
                        <section className='feeds-tags'>
                            <div className='feeds-pagination' >
                            <ul className='feeds'>
                                <section>
                                    {
                                        activeTag ? 
                                        <>
                                            <div onClick={() =>  handleClick("","feeds")} className={activeTag ? 'global-feeds' : 'global-feeds border-bottom'}>
                                                <NavLink activeClassName='active' className='nav-link' to='/' exact >Global Feed</NavLink>
                                            </div>
                                            <span onClick={() =>  handleClick(activeTag,"tags")} className={activeTag ? 'global-feeds border-bottom' : 'global-feeds'}>
                                                <NavLink activeClassName='active' className='nav-link' to='/' exact >#{activeTag}</NavLink>
                                            </span>
                                        </> : 
                                        <div onClick={() =>  handleClick("","feeds")} className='global-feeds border-bottom'>
                                            <NavLink activeClassName='active' className='nav-link' to='/' exact >Global Feed</NavLink>
                                        </div>
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
                            <Articles activeTag={activeTag} articles={articles} />
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
                            </div>
                            
                            <div className='tags'>
                                <h4 className='button-shrink' >Popular Tags</h4>
                                {
                                    (tagErr) ? 
                                    <>
                                        <p className='err-msg' >Not able to fetch tags !!!</p>
                                        <Loader />
                                    </>
                                    :
                                    (!allTags) ? 
                                        <Loader />
                                    :
                                <Tags handleClick={(name) =>  handleClick(name,"tags")} activeTag={activeTag} allTags={allTags} />
                                }
                            </div>
                        </section>
                        
                    </article>
                </>
        )
}

/* class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeTag: "",
            articles:null,
            allTags:null,
            sampleTag:"",
            articlePerPage: 10,
            offSet: 0,
            articlErr:"",
            tagErr:"",
        };
    }
    componentDidMount(){
        fetch(url.baseUrl + (`?offset=${this.state.offSet}&limit=100`))
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
        .catch(err => {
            
            // console.log(err);
            
            this.setState({articlErr:err})
        })

        fetch(url.tagsUrl)
        .then(res => {
            // console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({tags}) => {
            let arr = tags.reduce((acc,cv) => {
                if(!acc.includes(cv)){
                    acc.push(cv);
                }
                return acc;
            },[])
            this.setState({allTags:arr})
        })
        .catch(err => {
            // const error = this.state.error;
            // console.log(err);
            // error.tagErr = err;
            this.setState({tagErr:err})
        })
    }
    handleClick = (name,value,num) => {
        console.log(name)
        if(value === "tags"){
            this.setState((prev) => {
                return {
                    activeTag : name,
                    sampleTag:name,
                    articles:null,
                }
            })
        }
        if(value === "feeds"){
            this.setState((prev) => {
                return {
                    activeTag : "",
                    sampleTag: value,
                    articles:null,
                }
            })
        }
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
    componentDidUpdate(){
        const {activeTag,sampleTag} = this.state;
        if(!sampleTag)return;
        // console.log("update articles")
        // console.log(activeTag);
        fetch(activeTag ? url.baseUrl + (`?tag=${activeTag}&offset=${this.state.offSet}`) : url.baseUrl + (`?offset=${this.state.offSet}&limit=100`))
        .then(res => {
            console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({articles}) => {
            this.setState({
                articles:articles,
                sampleTag:"",
            })
        })
        .catch(console.error)
    }
    getPagination = (articles,articlePerPage) => {
        let arr = [];
        for(let i =1; i<= Math.ceil(articles.length/articlePerPage) + 1;i++){
            arr.push(<li onClick={() => this.handleClick("",i,"num")}  className={(i - 1)*this.state.articlePerPage  === this.state.offSet ? 'button-shrink activ-bg-color' : 'button-shrink'} key={i} >{i}</li>)
        }
        return arr;
    }
    render(){
        const {articles,allTags,activeTag,articlePerPage} = this.state;
        const {articlErr,tagErr} = this.state;
        // console.log(articles);
        return (
                <>
                    <Hero />
                    <article className='feeds-main container'>
                        <section className='feeds-tags'>
                            <div className='feeds-pagination' >
                            <ul className='feeds'>
                                <section>
                                    {
                                        activeTag ? 
                                        <>
                                            <div onClick={() =>  this.handleClick("","feeds")} className={activeTag ? 'global-feeds' : 'global-feeds border-bottom'}>
                                                <NavLink activeClassName='active' className='nav-link' to='/' exact >Global Feed</NavLink>
                                            </div>
                                            <span onClick={() =>  this.handleClick(activeTag,"tags")} className={activeTag ? 'global-feeds border-bottom' : 'global-feeds'}>
                                                <NavLink activeClassName='active' className='nav-link' to='/' exact >#{activeTag}</NavLink>
                                            </span>
                                        </> : 
                                        <div onClick={() =>  this.handleClick("","feeds")} className='global-feeds border-bottom'>
                                            <NavLink activeClassName='active' className='nav-link' to='/' exact >Global Feed</NavLink>
                                        </div>
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
                            <Articles activeTag={this.state.activeTag} articles={articles} />
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
                            </div>
                            
                            <div className='tags'>
                                <h4 className='button-shrink' >Popular Tags</h4>
                                {
                                    (tagErr) ? 
                                    <>
                                        <p className='err-msg' >Not able to fetch tags !!!</p>
                                        <Loader />
                                    </>
                                    :
                                    (!allTags) ? 
                                        <Loader />
                                    :
                                <Tags handleClick={(name) =>  this.handleClick(name,"tags")} activeTag={activeTag} allTags={allTags} />
                                }
                            </div>
                        </section>
                        
                    </article>
                </>
        )
    }
} */


export default Home;
