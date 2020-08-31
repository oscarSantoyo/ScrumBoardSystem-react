import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { selectProject } from '../../actions/projects'
import { getUserstories, deleteUserstory } from '../../actions/userstories'
import { getSprints } from '../../actions/sprints'
import UserStory from '../../components/userstories/UserStory'
import AddUserStoryModal from '../../components/userstories/AddUserStoryModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouteMatch } from 'react-router-dom'

const Sprint = (props) => {
  const { name, id, userStories } = props
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
    const us = userStories.filter(userStory => (userStory.sprint || {}).id == sprint.id)
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
  const { title, userStories,deleteUserstory,projectId }  = props
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
    <h2> {title} </h2> <FontAwesomeIcon icon="plus" onClick={handleShow} />

      <AddUserStoryModal
        show={show}
        handleClose={handleClose}
        handleShow = {handleShow}
      />

      <div className="accordion" id="accordionExample">
        {userStories && userStories.map(userStory => {
          return (
            <UserStory key={userStory.id} {...userStory} deleteUserstory={deleteUserstory} projectId={projectId}/>
          )
        })}
      </div>
    </div>
  )
}

const getUserStoriesWOSprint = (userStories) => userStories && userStories.filter(userStory => !userStory.sprint)
const ProjectSelectedContainer = (props) => {
  const { getUserStoriesByProjectId, getSprintsByProjectId, addUserStory,
          projectUserStories, project, projects, projectSprints, selectProjectState,deleteUserstory } = props
  const {projectId} = useRouteMatch().params

  useEffect(()=>{
    selectProjectState(projectId)
    getUserStoriesByProjectId(projectId)
    getSprintsByProjectId(projectId)
  },[projectId])
  useEffect(()=>{
    selectProjectState(projectId)
  },[projects])
  return (
    <div>
      <h1> {project && project.name} </h1>
      <UserStoriesContainer
        title="Backlog"
        addUserStory={addUserStory}
        deleteUserstory={deleteUserstory}
        projectId={projectId}
        userStories = { getUserStoriesWOSprint(projectUserStories) }
      />
      <SprintContainer
        sprints = { projectSprints }
        addUserStory = { addUserStory }
        deleteUserstory={deleteUserstory}
        userStories = { projectUserStories }
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
  selectProjectState: (projectId, projects) => dispatch(selectProject(projectId, projects)),
  getUserStoriesByProjectId: (projectId) => dispatch(getUserstories(dispatch, projectId)),
  getSprintsByProjectId: (projectId) => dispatch(getSprints(dispatch, projectId)),
  addUserStory: (projectId) => console.log('Create new userStory', projectId),
  getTasksByUserStoryId: (userStoryId) => console.log('Get tasks by userStory id'),
  deleteUserstory:(projectId,userStoryId)=>dispatch(deleteUserstory(dispatch,projectId,userStoryId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelectedContainer);
