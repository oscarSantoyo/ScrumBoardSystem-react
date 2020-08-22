import axios from 'axios'

export const addProject = (dispatch,name) => {
  axios.post('/apiprojects/projects',
  {
    name:name
  }).then(res=>res.data)
  .then(newProject=>{
    dispatch(projectAdded(newProject))
  })
  return {
    type: 'ADD_PROJECT'
  }}

  export const projectAdded=newProject=>({
    type:"ADDED_PROJECT",
    newProject
  })

  export const getProjects = (dispatch) => {
    axios.get('/apiprojects/projects').then(res=>res.data)
    .then(projects=>{
      dispatch(recieveProjects(projects))
    })
    return {
    type: 'FETCH_PROJECTS',
  }}

  export const recieveProjects=projects=>({
    type:"FETCHED_PROJECTS",
    projects
  })

  export const deleteProject=(dispatch,id)=>{
    axios.delete(`/apiprojects/projects/${id}`).then(res=>{
      if(res.status===200){
        dispatch(deletedProject(id))
      }
    })
    return {
      type:"DELETE_PROJECT"
    }
  }

  export const deletedProject=id=>({
    type:"DELETED_PROJECT",
    id
  })

