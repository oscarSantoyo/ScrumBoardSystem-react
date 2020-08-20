import React from 'react'
import UserStory from './UserStory' 
export const UserstoryList = (props) => {
    const userstories=props.userstories||[]
    return (
        <ul className="list-group">
            {userstories.map(userstory=>(
                <UserStory key={userstory.id} {...userstory}/>
            ))}
        </ul>
    )
}


export default UserstoryList
