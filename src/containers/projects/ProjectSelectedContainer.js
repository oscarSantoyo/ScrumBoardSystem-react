import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getUserstories,
  deleteUserstory,
  getSprints,
  selectProject,
  updateTask,
} from "../../actions/";
import UserStory from "../../components/userstories/UserStory";
import AddUserStoryModal from "../../components/userstories/AddUserStoryModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouteMatch } from "react-router-dom";

const Sprint = (props) => {
  const { name, id, userStories, projectId, deleteUserstory } = props;
  return (
    <div className="card">
      <div className="card-header" id="headingOne">
        <h2 className="mb-0">
          <button
            className="btn btn-link btn-block text-left"
            type="button"
            data-toggle="collapse"
            data-target={`#collapseSprint${id}`}
            aria-expanded="false"
            aria-controls={`#collapse${id}`}
          >
            {name}
          </button>
        </h2>
      </div>

      <div
        id={`collapseSprint${id}`}
        className="collapse show"
        aria-labelledby="headingOne"
        data-parent="#sprints"
      >
        <div className="card-body">
          <UserStoriesContainer
            title={`User Stories of Sprint ${name}`}
            userStories={userStories}
            deleteUserstory={deleteUserstory}
            projectId={projectId}
          />
        </div>
      </div>
    </div>
  );
};

const SprintContainer = (props) => {
  const { sprints, userStories, deleteUserstory, projectId } = props;
  const mutatedSprints = sprints.map((sprint) => {
    const us = userStories.filter(
      (userStory) => (userStory.sprint || {}).id === sprint.id
    );
    return { ...sprint, ...{ userStories: us } };
  });
  return (
    <div>
      <h2> UserStories by Sprint </h2>
      <div className="accordion" id="sprints">
        {mutatedSprints &&
          mutatedSprints.map((sprint) => {
            return (
              <Sprint
                key={sprint.id}
                {...sprint}
                deleteUserstory={deleteUserstory}
                projectId={projectId}
              />
            );
          })}
      </div>
    </div>
  );
};

const UserStoriesContainer = (props) => {
  const {
    title,
    userStories,
    projectId,
    deleteUserstory,
    updateTaskHandler,
  } = props;
  const [show, setShow] = useState(false);
  const [userStoryEdit, setUserStoryEdit] = useState({});

  const handleClose = () => {
    setUserStoryEdit({});
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const setUserStoryEditHandler = (userStory) => {
    setUserStoryEdit(userStory);
    handleShow();
  };

  return (
    <div>
      <h2> {title} </h2> <FontAwesomeIcon icon="plus" onClick={handleShow} />
      <AddUserStoryModal
        show={show}
        userStoryEdit={userStoryEdit}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <div className="accordion" id="accordionExample">
        {userStories &&
          userStories.map((userStory) => {
            return (
              <UserStory
                key={userStory.id}
                userStory={userStory}
                deleteUserstory={deleteUserstory}
                projectId={projectId}
                handleShow={handleShow}
                handleClose={handleClose}
                setUserStoryEditHandler={setUserStoryEditHandler}
                updateTaskHandler={updateTaskHandler}
              />
            );
          })}
      </div>
    </div>
  );
};

const getUserStoriesWOSprint = (userStories) =>
  userStories && userStories.filter((userStory) => !userStory.sprint);

const ProjectSelectedContainer = (props) => {
  const {
    getUserStoriesByProjectId,
    getSprintsByProjectId,
    addUserStory,
    projectUserStories,
    project,
    projects,
    projectSprints,
    selectProjectState,
    deleteUserstory,
    updateTask,
  } = props;
  const { projectId } = useRouteMatch().params;

  const updateTaskHandler = (userStoryId, task) => {
    updateTask(projectId, userStoryId, task);
  };

  useEffect(() => {
    selectProjectState(projectId);
    getUserStoriesByProjectId(projectId);
    getSprintsByProjectId(projectId);
  }, [
    getSprintsByProjectId,
    getUserStoriesByProjectId,
    projectId,
    selectProjectState,
  ]);
  useEffect(() => {
    selectProjectState(projectId);
  }, [projectId, projects, selectProjectState]);
  return (
    <div>
      <h1> {project && project.name} </h1>
      <UserStoriesContainer
        title="Backlog"
        addUserStory={addUserStory}
        deleteUserstory={deleteUserstory}
        userStories={getUserStoriesWOSprint(projectUserStories)}
        projectId={projectId}
        updateTaskHandler={updateTaskHandler}
      />
      <SprintContainer
        sprints={projectSprints}
        addUserStory={addUserStory}
        deleteUserstory={deleteUserstory}
        userStories={projectUserStories}
        projectId={projectId}
        updateTaskHandler={updateTaskHandler}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    project: state.projects.project,
    projectSprints: state.sprints,
    projectUserStories: state.userstories.userstories,
  };
};

const mapDispatchToProps = (dispatch) => ({
  selectProjectState: (projectId, projects) =>
    dispatch(selectProject(projectId, projects)),
  getUserStoriesByProjectId: (projectId) =>
    dispatch(getUserstories(dispatch, projectId)),
  getSprintsByProjectId: (projectId) =>
    dispatch(getSprints(dispatch, projectId)),
  addUserStory: (projectId) => console.log("Create new userStory", projectId),
  getTasksByUserStoryId: (userStoryId) =>
    console.log("Get tasks by userStory id"),
  deleteUserstory: (projectId, userStoryId) =>
    dispatch(deleteUserstory(dispatch, projectId, userStoryId)),
  updateTask: (projectId, userStoryId, task) =>
    dispatch(updateTask(dispatch, projectId, userStoryId, task)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSelectedContainer);
