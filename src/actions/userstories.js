import axios from "axios";

export const getUserstories = (dispatch, projectId) => {
  axios
    .get(`/apiprojects/projects/${projectId}/userstories`)
    .then((res) => res.data)
    .then((userstories) => {
      dispatch(fetchedUserstories(userstories));
    });
  return {
    type: "FETCH_USER_STORIES",
  };
};

const fetchedUserstories = (userstories) => {
  return {
    type: "FETCHED_USER_STORIES",
    userstories,
  };
};

export const addUserStory = (dispatch, projectId, newUserstory) => {
  axios
    .post(`/apiprojects/projects/${projectId}/userstories`, newUserstory)
    .then((res) => res.data)
    .then((userstory) =>
      dispatch(addedUserStory(dispatch, projectId, userstory))
    );
  return {
    type: "ADD_USER_STORY",
  };
};

const addedUserStory = (dispatch, projectId) => {
  dispatch(getUserstories(dispatch, projectId));
  return {
    type: "ADDED_USER_STORY",
  };
};

export const deleteUserstory = (dispatch, projectId, userStoryId) => {
  axios
    .delete(`/apiprojects/projects/${projectId}/userstories/${userStoryId}`)
    .then((res) => {
      if (res.status) {
        dispatch(deletedUserstory(dispatch, projectId));
      }
    });
  return {
    type: "DETELE_USER_STORY",
  };
};

const deletedUserstory = (dispatch, projectId) => {
  dispatch(getUserstories(dispatch, projectId));
  return {
    type: "DELETED_USER_STORY",
  };
};
