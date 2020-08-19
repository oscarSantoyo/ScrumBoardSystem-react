import Axios from "axios"

import axios from 'axios'

export const addProject = name => ({
    type: 'ADD_PROJECT',
    name
  })

  export const recieveProjects=projects=>({
    type:"RECIEVE_PROJECTS",
    projects
  })

  export const getProjects = (dispatch) => {
    axios.get('/apiprojects/projects').then(res=>res.data)
    .then(projects=>{
      dispatch(recieveProjects(projects))
    })
    return {
    type: 'GET_PROJECTS',
  }}