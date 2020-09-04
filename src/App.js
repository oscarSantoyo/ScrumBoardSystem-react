import React, { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import { getProjects as actionGetProjects } from "./actions/projects";
import { ProjectSelectedContainer, SideBarContainer } from "./containers/";
import { useAlert } from "react-alert";
library.add(faTrash, faEdit, faPlus);
const WelcomeComponent = () => <h1>Welcome!</h1>;

const getProjectsNav = (projects) => {
  if (!projects) return [];

  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    href: `/project/${project.id}`,
  }));
};
const App = (props) => {
  const alert = useAlert();
  const { getProjects, projects, error } = props;
  const entries = [
    { id: "projects", name: "Projects", subMenu: getProjectsNav(projects) },
  ];

  useEffect(() => getProjects(), [getProjects]);

  useEffect(() => {
    if (!!error && error.message != null) alert.error(error.message);
  }, [error]);
  return (
    <div className="wrapper">
      <SideBarContainer title="Scrum Manager" entries={entries} />
      <div className="App container">
        <Switch>
          <Route exact path="/" component={WelcomeComponent} />
          <Route
            path="/project/:projectId"
            component={ProjectSelectedContainer}
          />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  projects: state.projects.projects,
  error: state.alerts.error,
});

const mapDispatchToProps = (dispatch) => ({
  getProjects: () => dispatch(actionGetProjects(dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
