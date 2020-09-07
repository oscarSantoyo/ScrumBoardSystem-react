const userstories = (
  state = { userstories: [], saveSucceeded: true },
  action
) => {
  switch (action.type) {
    case "FETCH_USERS_STORIES":
      return state;
    case "FETCHED_USER_STORIES":
      return Object.assign({}, state, { userstories: action.userstories });
    case "ADD_USER_STORY":
      return state;
    case "ADDED_USER_STORY":
      return state;
    case "ERROR_ADD_USER_STORY":
      return Object.assign({}, state, { saveSucceeded: false });
    case "CLEAN_ERROR_ADD_USER_STORY":
      return Object.assign({}, state, { saveSucceeded: true });
    case "DELETE_USER_STORY":
      return state;
    case "DELETED_USER_STORY":
      return state;
    default:
      return state;
  }
};

export default userstories;
