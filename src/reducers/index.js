import { combineReducers } from 'redux'
import projects from './projects'
import userstories from './userstories' 
import global from './global'
import sprints from './sprints'

const reducers= combineReducers({
  projects,
  userstories,
  sprints,
  global
})

export default reducers