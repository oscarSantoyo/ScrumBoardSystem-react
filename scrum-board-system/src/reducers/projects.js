const projects = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return state
    case 'ADDED_PROJECT':
      const {newProject}=action
      return [...state,{
        id:newProject.id,
        name:newProject.name
      }]
    case 'FETCH_PROJECTS':
      return state
    case 'FETCHED_PROJECTS':
      return [...state, ...action.projects]
      case 'DELETED_PROJECT':
        return state.filter(project=>project.id!==action.id)
    default:
      return state
  }
}

export default projects