import { combineReducers } from 'redux'
import projects from './projects'
import userstories from './userstories' 
import global from './global'
import sprints from './sprints'
import labels from './labels'

const reducers= combineReducers({
  projects,
  userstories,
  sprints,
  global,
  labels
})

export default reducers