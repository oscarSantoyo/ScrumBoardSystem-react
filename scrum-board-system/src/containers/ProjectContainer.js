import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import AddProject from './AddProject'
import ProjectList from '../components/ProjectList'
import { getProjects,deleteProject} from '../actions'


export const ProjectContainer = ({projects,getProjects,deleteProject}) => {
    useEffect(()=>{
        getProjects()
    },[])
    return (
        <div className="d-flex align-items-star flex-column">
            <AddProject/>
            <ProjectList projects={projects} onDelete={deleteProject} />
        </div>
    )
}


const mapStateToProps = (state) => ({
    projects: state.projects
})

const mapDispatchToProps = dispatch=> ({
    getProjects:()=>dispatch(getProjects(dispatch)),
    deleteProject: id =>dispatch(deleteProject(dispatch,id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer)

