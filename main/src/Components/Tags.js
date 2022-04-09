import React from 'react'; 
// import {Link,NavLink} from 'react-router-dom';
// import url from './URL';

function Tags(props) {
    const {allTags,activeTag} = props;
        return (
            <ul className='all-tags'>
                {
                    (allTags.filter(tag => tag !== "")).map((tag,index) => {
                        return (
                            <li className={tag === activeTag ? 'button-shrink active-tag' : "button-shrink"} onClick={() => props.handleClick(tag)} key={index} >{tag}</li>
                        )
                    })
                }
            </ul>
        )
    // }
}


export default Tags;