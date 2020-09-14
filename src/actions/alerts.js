export const setErrorAlert = (dispatch, errorMessage) => {
  return {
    type: "SET_ERROR",
    error: {
      message: errorMessage,
      type: "danger",
    },
  };
};

const cleanErrorAlert = (id) => ({
  type: "CLEAN_ERROR",
  id,
});
