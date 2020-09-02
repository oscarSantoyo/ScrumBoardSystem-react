const global = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_PROJECT":
      return Object.assign({}, state, {
        touched: true,
      });
    default:
      return state;
  }
};

export default global;
