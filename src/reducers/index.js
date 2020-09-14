import { combineReducers } from "redux";
import projects from "./projects";
import userstories from "./userstories";
import sprints from "./sprints";
import labels from "./labels";
import alerts from "./alerts";

const reducers = combineReducers({
  projects,
  userstories,
  sprints,
  labels,
  alerts,
});

export default reducers;
