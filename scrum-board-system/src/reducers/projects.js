const projects = (state = {projects: [], project: {}}, action) => {
  switch (action.type) {
    case 'SELECT_PROJECT':
      if (state.projects.length <= 0) return state
      const {projects} = state
      const project = projects.find(projectObj => projectObj.id == action.projectId)
      return Object.assign({}, state, {
        project
      })
    case 'ADD_PROJECT':
      return state
    case 'ADDED_PROJECT':
      const {newProject}=action
      return Object.assign({}, state, {
        id:newProject.id,
        name:newProject.name
      })
    case 'FETCHED_PROJECTS':
      return Object.assign({}, state, {projects: action.projects})
      case 'DELETED_PROJECT':
        return state.filter(project=>project.id!==action.id)
    default:
      return state
  }
}

export default projects
