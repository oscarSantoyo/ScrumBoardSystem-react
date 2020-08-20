import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const UserStory = ({id,title,description}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            {title}
            <div >
            <span >
                <FontAwesomeIcon icon="trash"/>
            </span>
            <span >
                <FontAwesomeIcon icon="edit"/>
            </span>
            </div>

        </li>
    )
}

export default UserStory
