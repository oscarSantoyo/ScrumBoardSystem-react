import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const UserStory = ({ id, title, description, weight, currentProjectId,deleteUserStory}) => {
    return (
        <li className={"list-group-item d-flex justify-content-between"} id={id}>
            {title}
            <div >
                <span className="badge badge-primary badge-pill mr-3">{weight}</span>
                <span className="mr-2" onClick={()=>deleteUserStory(currentProjectId,id)}>
                    <FontAwesomeIcon icon="trash" />
                </span>
                <span >
                    <FontAwesomeIcon icon="edit" className="invisible"/>
                </span>

            </div>

        </li>
    )
}

export default UserStory
