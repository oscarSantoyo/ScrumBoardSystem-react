import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSprints, deleteSprint } from "../../actions/";
import { AddSprint } from "./AddSprint";
import SprintList from "../../components/sprints/SprintList";

export const SprintContainer = ({
  sprints,
  currentProjectId,
  getSprints,
  deleteSprint,
}) => {
  useEffect(() => {
    if (!!currentProjectId) {
      getSprints(currentProjectId);
    }
  }, [currentProjectId, getSprints]);
  return (
    <div>
      <AddSprint />
      <h3>Sprints List</h3>
      <SprintList
        sprints={sprints}
        currentProjectId={currentProjectId}
        deleteSprint={deleteSprint}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  sprints: state.sprints,
  currentProjectId: state.global.projectId,
});

const mapDispatchToProps = (dispatch) => ({
  getSprints: (currentProjectId) =>
    dispatch(getSprints(dispatch, currentProjectId)),
  deleteSprint: (currentProjectId, sprintId) =>
    dispatch(deleteSprint(dispatch, currentProjectId, sprintId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SprintContainer);
