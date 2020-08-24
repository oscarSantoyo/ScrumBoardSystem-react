import { combineReducers } from 'redux'
import projects from './projects'
import userstories from './userstories' 
import global from './global'

const reducers= combineReducers({
  projects,
  userstories,
  global
})

export default reducers