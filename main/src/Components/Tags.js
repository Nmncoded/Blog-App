import React from 'react'; 
import {Link,NavLink} from 'react-router-dom';
import url from './URL';

class Tags extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // allTags:null,
        }
    }
    /* componentDidMount(){
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
            console.log(tags);
            this.setState({allTags:tags})
        })
        .catch(console.error)
    } */
    render(){
        const {allTags,activeTag} = this.props;
        return (
            <ul className='all-tags'>
                {
                    (allTags.filter(tag => tag !== "")).map((tag,index) => {
                        return (
                            <li className={tag === activeTag ? 'button-shrink active-tag' : "button-shrink"} onClick={() => this.props.handleClick(tag)} key={index} >{tag}</li>
                        )
                    })
                }
            </ul>
        )
    }
}

// function Loader(){
//     return (
//         <div className="bouncing-loader">
//             <div></div>
//             <div></div>
//             <div></div>
//         </div>
//     )
// }

export default Tags;