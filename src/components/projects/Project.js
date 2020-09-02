import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Project = ({ id,name,currentProjectId,onDelete,onSelect}) => (
    <li className={"list-group-item d-flex justify-content-between "+(currentProjectId===id? 'active':'')} id={id} onClick={()=>onSelect(id)}>
        {name}
        <span onClick={()=>onDelete(id)}>
            <FontAwesomeIcon icon="trash" ></FontAwesomeIcon>
        </span>
    </li>
)

Project.propTypes = {
    id:PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onDelete:PropTypes.func.isRequired,
    onSelect:PropTypes.func.isRequired
}

export default Project
