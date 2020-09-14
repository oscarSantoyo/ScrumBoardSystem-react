const userstories = (
  state = { userstories: [], saveSucceeded: true, saving: false },
  action
) => {
  switch (action.type) {
    case "FETCH_USERS_STORIES":
      return state;
    case "FETCHED_USER_STORIES":
      return Object.assign({}, state, { userstories: action.userstories });
    case "ADD_USER_STORY":
      return Object.assign({}, state, { saving: true });
    case "ADDED_USER_STORY":
      return Object.assign({}, state, { saving: false, saveSucceeded: true });
    case "ERROR_ADD_USER_STORY":
      return Object.assign({}, state, { saveSucceeded: false, saving: false });
    case "CLEAN_ERROR_ADD_USER_STORY":
      return Object.assign({}, state, { saveSucceeded: true, saving: false });
    case "DELETE_USER_STORY":
      return state;
    case "DELETED_USER_STORY":
      return state;
    default:
      return state;
  }
};

export default userstories;
