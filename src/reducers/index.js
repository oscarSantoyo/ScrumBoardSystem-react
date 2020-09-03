import { combineReducers } from "redux";
import projects from "./projects";
import userstories from "./userstories";
import sprints from "./sprints";
import labels from "./labels";

const reducers = combineReducers({
  projects,
  userstories,
  sprints,
  labels,
});

export default reducers;
