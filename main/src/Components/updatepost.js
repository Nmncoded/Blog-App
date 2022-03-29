import React from 'react';
import url from './URL';
import '../Stylesheets/newpost-styles/newpost.css';
import {withRouter} from 'react-router-dom';
import Loader from './loader'

class UpdatePost extends React.Component {
    constructor(props){
        super(props);
        this.state={
            extra:"",
            title:"",
            description:"",
            body:"",
            tags:"",
            errors:{
                message:"",
            }
        }
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
            this.setState({
                title:article.title,
                description:article.description,
                body:article.body,
                tags:article.tagList.join(","),
                extra: " ",
            })
        })
        // .then(data => console.log(data.tags))
        .catch(err => {
            
            // console.log(err);
            
            this.setState({articlErr:err})
        })
    }
    handleInputChange = ({target}) => {
        const {name,value} = target;

        this.setState({
            [name]:value,
        })
    }
    handleInputSubmit = (event) => {
        event.preventDefault();
        let {title,description,body,tags} = this.state;
        let slug = this.props.match.params.slug;
        let token = this.props.user.token;
        // alert(title + description + body + tags)
        fetch(url.baseUrl + "/" + slug,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                authorization : `Token ${token}`
            },
            body: JSON.stringify({
                article:{
                title,
                description,
                body,
                tagList: tags.split(",").map(tag => tag.trim())
                }
            })
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
            this.props.history.push('/profile');
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
        let {title,description,body,tags,errors,extra} = this.state;
        
        return (
            <section className='main-signin newpost flex-center-center' >
                <h2>Update Article</h2>
                {
                    !extra ? 
                    <Loader />  : 
                    <form onSubmit={this.handleInputSubmit} className='flex-center-center'>
                        <input type='text' className='email' value={title} onChange={this.handleInputChange} name="title" placeholder='Article title'/>
                        <div className='errs'>{errors.message}</div>
                        <input type='text'  className='password' value={description}  onChange={this.handleInputChange} name="description" placeholder={`What's this article about?`}/>
                        <textarea rows={10} className='email' value={body} onChange={this.handleInputChange} name='body' placeholder='write your article (in markdown format)' ></textarea>
                        <input type='text'  className='password' value={tags}  onChange={this.handleInputChange} name="tags" placeholder="Enter tags" />
                        <input type='submit' disabled={!title || !description || !body || !tags} className='button-swing submit-btn'  value={!title || !description || !body || !tags ? "No field should be empty" : "Update Article(Click me!)"} />
                    </form>
                }
            </section>
        )
    }
}

export default withRouter(UpdatePost);