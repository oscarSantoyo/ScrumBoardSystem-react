import React from "react";
import { connect } from "react-redux";
import { addUserStory } from "../../actions/";

export const AddUserstory = ({ projectId, addUserStory }) => {
  let title;
  let points;
  let description;

  return (
    <div className="mt-2">
      <form
        className="form-inline"
        onSubmit={(event) => {
          event.preventDefault();
          const newUserstory = {
            title: title.value.trim(),
            description: description.value.trim(),
            weight: points.value.trim(),
          };
          addUserStory(projectId, newUserstory);
          title.value = "";
          description.value = "";
          points.value = "";
        }}
      >
        <div className="form-row align-items-center">
          <div className="col-auto mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              ref={(node) => (title = node)}
            />
          </div>
          <div className="col-auto mt-2">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">USP</div>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="User Story Points"
                ref={(node) => (points = node)}
              />
            </div>
          </div>
          <div className="col-auto mt-2">
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Description"
                ref={(node) => (description = node)}
              />
            </div>
          </div>
          <div className="col-auto mt-2">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  projectId: state.global.projectId,
});
const mapDispatchToProps = (dispatch) => ({
  addUserStory: (projectId, newUserstory) =>
    dispatch(addUserStory(dispatch, projectId, newUserstory)),
});

//TODO CAMBIAR LOS REFS POR OBJECTOS(TAGS) NATIVOS DE REACT
//TODO MANDAR QUITAR EL ADD DEL SUBMIT NO USAR LOS EVENTOS DEL SUBMIT

export default connect(mapStateToProps, mapDispatchToProps)(AddUserstory);
