import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Project = ({ id,name, onDelete}) => (
    <li className="list-group-item d-flex justify-content-between" id={id}>
        {name}
        <span onClick={()=>onDelete(id)}>
            <FontAwesomeIcon icon="trash" ></FontAwesomeIcon>
        </span>
    </li>
)

Project.propTypes = {
    name: PropTypes.string.isRequired
}

export default Project
