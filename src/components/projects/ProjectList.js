import React from "react";
import PropTypes from "prop-types";
import Project from "./Project";

const ProjectList = (props) => {
  const projects = props.projects || [];

  return (
    <ul className="list-group d-flex  lign-items-start">
      {projects.map((project) => (
        <Project
          key={project.id}
          {...project}
          onDelete={props.onDelete}
          onSelect={props.onSelect}
          currentProjectId={props.currentProjectId}
        />
      ))}
    </ul>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ProjectList;
