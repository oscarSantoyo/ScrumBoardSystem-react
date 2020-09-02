const labels = (state = { labels: [] }, action) => {
  switch (action.type) {
    case "FETCH_LABELS":
      return state;
    case "FETCHED_LABELS":
      return Object.assign({}, state, { labels: action.labels });
    default:
      return state;
  }
};

export default labels;
