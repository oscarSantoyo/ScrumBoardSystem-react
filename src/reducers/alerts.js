const alerts = (state = { error: {}, success: "" }, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return Object.assign({}, state, {
        error: {
          message: action.error.message,
        },
      });
    case "CLEAN_ERROR":
      return state;
    default:
      return state;
  }
};

export default alerts;
