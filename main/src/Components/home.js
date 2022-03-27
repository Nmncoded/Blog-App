import React from 'react'; 
import {Link,NavLink} from 'react-router-dom';
import url from './URL';
import '../Stylesheets/HOme-styles/Home-style.css'; 
import Hero from './hero.js';
import Articles from './Articles';
import Tags from './Tags.js';
import Loader from './loader';



class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeTag: "",
            sampleTag:"",
            articles:null,
            allTags:null,
            articlePerPage: 8,
        };
    }
    componentDidMount(){
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
            // console.log(articles);
            this.setState({articles:articles})
        })
        // .then(data => console.log(data.tags))
        .catch(console.error)

        fetch(url.tagsUrl)
        .then(res => {
            console.log(res)
            if(!res.ok){
                throw new Error("check your Url")
            }else{
                return res.json()
            }
        })
        .then(({tags}) => {
            this.setState({allTags:tags})
        })
        .catch(console.error)
    }
    handleClick = (name,value) => {
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
    }
    componentDidUpdate(){
        const {activeTag,sampleTag} = this.state;
        if(!sampleTag)return;
        // console.log("update articles")
        console.log(activeTag);
        fetch(activeTag ? url.baseUrl + (`?tag=${activeTag}`) : url.baseUrl)
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
        let arr = []
        for(let i =1; i<= Math.ceil(articles.length/articlePerPage);i++){
            arr.push(<li className='button-shrink' key={i} >{i}</li>)
        }
        return arr;
    }
    render(){
        const {articles,allTags,activeTag,articlePerPage} = this.state;
        console.log(articles);
        return (
                <>
                    <Hero />
                    <article className='feeds-main container'>
                        <section className='feeds-tags'>
                            <ul className='feeds'>
                                <section>
                                    {
                                        activeTag ? 
                                        <>
                                            <div onClick={() =>  this.handleClick("","feeds")} className={activeTag ? 'global-feeds' : 'global-feeds border-bottom'}>
                                                <NavLink activeClassName='active' className='nav-link' to='/' exact >Global Feed</NavLink>
                                            </div>
                                            <span onClick={() =>  this.handleClick("","tags")} className={activeTag ? 'global-feeds border-bottom' : 'global-feeds'}>
                                                <NavLink activeClassName='active' className='nav-link' to='/' exact >#{activeTag}</NavLink>
                                            </span>
                                        </> : 
                                        <div onClick={() =>  this.handleClick("","feeds")} className='global-feeds border-bottom'>
                                            <NavLink activeClassName='active' className='nav-link' to='/' exact >Global Feed</NavLink>
                                        </div>
                                    }
                                </section>
                            {
                                (!articles) ? <Loader /> : 
                            <Articles activeTag={this.state.activeTag} articles={articles} />
                            }
                            </ul>
                            <div className='tags'>
                                <h4>Popular Tags</h4>
                                {
                                    (!allTags) ? <Loader /> :
                                <Tags handleClick={(name) =>  this.handleClick(name,"tags")} activeTag={activeTag} allTags={allTags} />
                                }
                            </div>
                        </section>
                        <section className='pagination flex-center-center'>
                            <button className=' font-size button-shrink'>Prev</button>
                            <ul className='flex-center-center' >
                            {
                                articles ? 
                                this.getPagination(articles,articlePerPage)
                                : 
                                ""
                            }
                            </ul>
                            <button className=' font-size button-swing'>Next</button>
                        </section>
                    </article>
                </>
        )
    }
}


export default Home;