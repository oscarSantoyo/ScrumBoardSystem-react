import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { selectProject } from '../../actions/projects'
import { getUserstories } from '../../actions/userstories'

const UserStory = (props) => {
  const {title, description, weight, labels, tasks} = props
  console.log('props: ',props)
  return (
    <div className="card">
    <div className="card-header" id="headingOne">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          {title} : {weight}
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
        {description}
      </div>
    </div>
  </div>
  )
}

const getProjectName = (projects, projectId) => projects.find && projects.find(project => project.id === projectId).name

const ProjectSelectedContainer = (props) => {
  const { getUserStoriesByProjectId, projectUserStories, project, selectProject, projects} = props
  const { projectId } = props.match.params
  useEffect(()=>{
    selectProject(projectId)
    getUserStoriesByProjectId(projectId);
  },[projectId])
  useEffect(()=>{
    console.log('projects changed: ',projects)
    if(projects.length > 0){
      selectProject(projectId)
      console.log('selecting project', projectId)
    }
  },[projects])
  return (
    <div>
      <h1> {project && project.name} </h1>
      <h2> User Stories </h2>
      <div class="accordion" id="accordionExample">
        {projectUserStories && projectUserStories.map(userStory => {
          return (
            <UserStory key={userStory.id} {...userStory}/>
          )
        })}
      </div>
    </div>
    )
}

const mapStateToProps = (state, props) => {
  return {
    projects: state.projects.projects,
    project: state.projects.project,
    projectUserStories : state.userstories,
    tasks: state.tasks
}}

const mapDispatchToProps = dispatch => ({
  selectProject: (projectId) => dispatch(selectProject(projectId)),
  getUserStoriesByProjectId: (projectId) => dispatch(getUserstories(dispatch, projectId)),
  addUserStory: (projectId) => console.log('Create new userStory', projectId),
  getTasksByUserStoryId: (userStoryId) => console.log('Get tasks by userStory id')
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelectedContainer);
