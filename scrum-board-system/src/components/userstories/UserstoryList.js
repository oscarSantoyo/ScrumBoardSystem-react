import React from 'react'
import UserStory from './UserStory' 
export const UserstoryList = (props) => {
    const userstories=props.userstories||[]
    return (
        <ul className="list-group">
            {userstories.map(userstory=>(
                <UserStory key={userstory.id} {...userstory} currentProjectId={props.currentProjectId} deleteUserStory={props.deleteUserStory}/>
            ))}
        </ul>
    )
}


export default UserstoryList
