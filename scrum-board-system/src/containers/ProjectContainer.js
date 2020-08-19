import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import AddProject from './AddProject'
import ProjectList from '../components/ProjectList'
import { getProjects} from '../actions'


export const ProjectContainer = ({projects,getProjects}) => {
    useEffect(()=>{
        getProjects()
    },[])
    return (
        <div>
            <AddProject/>
            <ProjectList projects={projects}/>
        </div>
    )
}


const mapStateToProps = (state) => ({
    projects: state.projects
})

const mapDispatchToProps = dispatch=> ({
    getProjects:()=>dispatch(getProjects(dispatch))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer)

