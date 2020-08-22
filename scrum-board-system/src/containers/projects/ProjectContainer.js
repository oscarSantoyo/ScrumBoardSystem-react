import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AddProject from './AddProject'
import ProjectList from '../../components/projects/ProjectList'
import { getProjects,deleteProject} from '../../actions/projects'
import { setCurrentProject} from '../../actions/global'


export const ProjectContainer = ({projects,currentProjectId,getProjects,deleteProject,setCurrentProject}) => {
    useEffect(()=>{
        getProjects()
    },[])
    return (
        <div className="d-flex align-items-star flex-column">
            <h3>Add New Project</h3>
            <AddProject/>
            <h3>Project List</h3>
            <ProjectList projects={projects} onDelete={deleteProject} onSelect={setCurrentProject} currentProjectId={currentProjectId}/>
        </div>
    )
}


const mapStateToProps = (state) => ({
    projects: state.projects,
    currentProjectId:state.global.projectId
})

const mapDispatchToProps = dispatch=> ({
    getProjects:()=>dispatch(getProjects(dispatch)),
    deleteProject: id =>dispatch(deleteProject(dispatch,id)),
    setCurrentProject: id =>dispatch(setCurrentProject(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer)

