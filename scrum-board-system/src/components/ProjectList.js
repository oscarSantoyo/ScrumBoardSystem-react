import React from 'react'
import PropTypes from 'prop-types'
import Project from './Project'

const ProjectList=(props)=>{
    console.log("proyects: ",props)
    const projects = props.projects||[]
   
    return (<ul>
        {projects.map(project=>(
            <Project key={project.id} {...project} />
        ))}
    </ul>)
}

ProjectList.propTypes={
    projects:PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.number.isRequired,
            name:PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
}

export default ProjectList