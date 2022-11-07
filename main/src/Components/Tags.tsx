import React from 'react'; 
import { tagsProps } from './typesDefined';
// import {Link,NavLink} from 'react-router-dom';
// import url from './URL';

function Tags(props:tagsProps):JSX.Element {
    const {allTags,activeTag} = props;
    // console.log(allTags.map(elm => elm.trim() ).filter(elm => elm !== "").sort())
        return (
            <ul className='all-tags'>
                {
                    allTags.map(elm => elm.trim() ).filter(elm => elm !== "").sort().map((tag,index) => {
                        return (
                            <li className={tag === activeTag ? 'button-shrink active-tag' : "button-shrink"} onClick={() => props.handleClick(tag,"","")} key={index} >{tag}</li>
                        )
                    })
                }
            </ul>
        )
    // }
}


export default Tags;