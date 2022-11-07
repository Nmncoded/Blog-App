import React,{useState,useEffect} from 'react';
import url from './URL';
import '../Stylesheets/newpost-styles/newpost.css';
import {withRouter, RouteComponentProps } from 'react-router-dom';
import {  similarProps } from './typesDefined';

type comProps = RouteComponentProps & similarProps

function NewPost(props:comProps): JSX.Element {
    let [title,setTitle] = useState("");
    let [description,setDescription] = useState("");
    let [body,setBody] = useState("");
    let [tags,setTags] = useState("");
    let [errors,setErrors] = useState("");

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const {name,value} = e.target;

        if(name === 'title'){
            setTitle(title = value);
        }
        if(name === 'description'){
            setDescription(description = value);
        }
        if(name === 'body'){
            setBody(body = value);
        }
        if(name === 'tags'){
            setTags(tags = value);
        }
    }

    const handleInputSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        fetch(url.baseUrl,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                authorization : `Token ${props?.user?.token}`
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
                    return Promise.reject("Check your fetch url, article not posted !!!")
                })
            }else{
                return res.json()
            }
        })
        .then((user) => {
            props.history.push('/');
        })
        .catch(message => {
            setErrors(errors = message);
        })
    }

        return (
            <section className='main-signin newpost flex-center-center' >
                <h2>New Article</h2>
                <form onSubmit={handleInputSubmit} className='flex-center-center'>
                    <input type='text' className='email' value={title} onChange={handleInputChange} name="title" placeholder='Article title'/>
                    <div className='errs'>{errors}</div>
                    <input type='text'  className='password' value={description}  onChange={handleInputChange} name="description" placeholder={`What's this article about?`}/>
                    <textarea rows={10} className='email' value={body} onChange={handleInputChange} name='body' placeholder='write your article (in markdown format)' ></textarea>
                    <input type='text'  className='password' value={tags}  onChange={handleInputChange} name="tags" placeholder="Enter tags" />
                    <input type='submit' disabled={!title || !description || !body || !tags} className='button-swing submit-btn'  value={!title || !description || !body || !tags ? "No field should be empty" : "Post Article(Click me!)"} />
                </form>
            </section>
        )
}

export default withRouter(NewPost);

/* class NewPost extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title:"",
            description:"",
            body:"",
            tags:"",
            errors:{
                message:"",
            }
        }
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
        // alert(title + description + body + tags)
        fetch(url.baseUrl,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                authorization : `Token ${this.props.user.token}`
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
                    return Promise.reject("Check your fetch url, article not posted !!!")
                })
            }else{
                return res.json()
            }
        })
        .then((user) => {
            // console.log(user);
            this.props.history.push('/');
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
        let {title,description,body,tags,errors} = this.state;
        return (
            <section className='main-signin newpost flex-center-center' >
                <h2>New Article</h2>
                <form onSubmit={this.handleInputSubmit} className='flex-center-center'>
                    <input type='text' className='email' value={title} onChange={this.handleInputChange} name="title" placeholder='Article title'/>
                    <div className='errs'>{errors.message}</div>
                    <input type='text'  className='password' value={description}  onChange={this.handleInputChange} name="description" placeholder={`What's this article about?`}/>
                    <textarea rows={10} className='email' value={body} onChange={this.handleInputChange} name='body' placeholder='write your article (in markdown format)' ></textarea>
                    <input type='text'  className='password' value={tags}  onChange={this.handleInputChange} name="tags" placeholder="Enter tags" />
                    <input type='submit' disabled={!title || !description || !body || !tags} className='button-swing submit-btn'  value={!title || !description || !body || !tags ? "No field should be empty" : "Post Article(Click me!)"} />
                </form>
            </section>
        )
    }
} */
