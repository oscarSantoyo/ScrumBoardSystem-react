import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Project = ({name})=>(
    <li>
        {name}
    </li>
)

Project.propTypes={
    name:PropTypes.string.isRequired
}

export default Project
