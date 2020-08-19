import axios from 'axios'
import { parseJsonSourceFileConfigFileContent } from 'typescript'

const projects = (state = {}, action) => {
    switch (action.type) {
      case 'ADD_PROJECT':
        return Object.assign({},state,
          {
            id: action.id,
            name: action.name
          }
        )
/*       case  'GET_PROJECTS':
        console.log("LLEGO A PEDIR PROJECTOS")
        const projects = await axios.get('/apiprojects/projects').then(res=>res.data)
        const tempState=[...state,projects]
      return tempState */
      case  'GET_PROJECTS':
      return state
      case 'RECIEVE_PROJECTS':
        console.log("LLEGO A RECIBIR PROJECTS")
        const {projects}=action
        console.log(projects)
        const stateTmp= Object.assign({},state)
          stateTmp["projects"]=projects
        return stateTmp
      default:
        return state
    }
  }
  
  export default projects