import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { selectProject } from '../../actions/projects'
import { getUserstories } from '../../actions/userstories'
import { getSprints } from '../../actions/sprints'
import UserStory from '../../components/userstories/UserStory'

const Sprint = (props) => {
  const { name, id, userStories } = props
  console.log('Sprint props', props)
  return (
    <div className="card">
    <div className="card-header" id="headingOne">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                data-target={`#collapseSprint${id}`} aria-expanded="true" aria-controls={`#collapse${id}`}>
          {name}
        </button>
      </h2>
    </div>

      <div id={`collapseSprint${id}`} className="collapse show" aria-labelledby="headingOne" data-parent="#sprints">
      <div className="card-body">
        <UserStoriesContainer title={`User Stories of Sprint ${name}`} userStories={userStories}/>
      </div>
    </div>
  </div>
    )
}

const SprintContainer = (props) => {
  const { sprints, userStories } = props;
  const mutatedSprints = sprints.map(sprint => {
    const us = userStories.filter(userStory => userStory.sprint && userStory.sprint.id == sprint.id)
    return {...sprint, ...{userStories: us}}
  })
  return (
    <div>
        <h2> UserStories by Sprint </h2>
      <div className="accordion" id="sprints">
    {mutatedSprints && mutatedSprints.map(sprint => {
      return (
        <Sprint key={sprint.id} {...sprint}/>
      )
    })}
    </div>
    </div>
  )
}

const UserStoriesContainer = (props) => {
  const { title, userStories } = props
  return (
    <div>
      <h2> {title} </h2>
      <div class="accordion" id="accordionExample">
        {userStories && userStories.map(userStory => {
          return (
            <UserStory key={userStory.id} {...userStory}/>
          )
        })}
      </div>
    </div>
  )
}

const getUserStoriesWOSprint = (userStories) => userStories && userStories.filter(userStory => !userStory.sprint)
const ProjectSelectedContainer = (props) => {
  const { getUserStoriesByProjectId, getSprintsByProjectId, projectUserStories, project, projects, projectSprints } = props
  const { projectId } = props.match.params
  useEffect(()=>{
    selectProject(projectId)
    getUserStoriesByProjectId(projectId)
    getSprintsByProjectId(projectId)
  },[projectId])
  useEffect(()=>{
    console.log('projects changed: ',projects)
    if(projects.lengt > 0){
      selectProject(projectId)
      console.log('selecting project', projectId)
    }
  },[projects])
  return (
    <div>
      <h1> {project && project.name} </h1>
      <UserStoriesContainer
        title="backlog"
        userStories = { projectUserStories }
      />
      <SprintContainer
        sprints = { projectSprints }
        userStories = { getUserStoriesWOSprint(projectUserStories) }
      />
    </div>
    )
}

const mapStateToProps = (state, props) => {
  return {
    projects: state.projects.projects,
    project: state.projects.project,
    projectSprints: state.sprints,
    projectUserStories : state.userstories,
    tasks: state.tasks
}}

const mapDispatchToProps = dispatch => ({
  selectProject: (projectId) => dispatch(selectProject(projectId)),
  getUserStoriesByProjectId: (projectId) => dispatch(getUserstories(dispatch, projectId)),
  getSprintsByProjectId: (projectId) => dispatch(getSprints(dispatch, projectId)),
  addUserStory: (projectId) => console.log('Create new userStory', projectId),
  getTasksByUserStoryId: (userStoryId) => console.log('Get tasks by userStory id')
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelectedContainer);
