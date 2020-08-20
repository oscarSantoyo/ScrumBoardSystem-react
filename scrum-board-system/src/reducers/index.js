import { combineReducers } from 'redux'
import projects from './projects'
import userstories from './userstories' 

const reducers= combineReducers({
  projects,
  userstories
})

export default reducers