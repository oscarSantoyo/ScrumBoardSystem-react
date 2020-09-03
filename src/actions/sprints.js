import axios from "axios";

export const getSprints = (dispatch, projectId) => {
  axios
    .get(`/apiprojects/projects/${projectId}/sprints`)
    .then((res) => res.data)
    .then((sprints) => {
      dispatch(fetchedSprints(sprints));
    });
  return {
    type: "FETCH_SPRINTS",
  };
};

export const fetchedSprints = (sprints) => ({
  type: "FETCHED_SPRINTS",
  sprints,
});

export const addSprint = (dispatch, projectId, newSprint) => {
  axios
    .post(`/apiprojects/projects/${projectId}/sprints`, newSprint)
    .then((res) => res.data)
    .then((newSprint) => dispatch.addedSprint(newSprint));
  return {
    type: "ADD_SPRINT",
  };
};

export const addedSprint = (newSprint) => ({
  type: "ADDED_SPRINT",
  newSprint,
});

export const deleteSprint = (dispatch, currentProjectId, sprintId) => {
  axios
    .delete(`/apiprojects/projects/${currentProjectId}/sprints/${sprintId}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(deletedSprint(sprintId));
      }
    });
  return {
    type: "DELETE_SPRINT",
  };
};

export const deletedSprint = (sprintId) => ({
  type: "DELETED_SPRINT",
  sprintId,
});
