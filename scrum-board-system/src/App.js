import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import './App.css';
import ProjectContainer from './containers/projects/ProjectContainer';
import UserStoryContainer  from './containers/userstories/UserStoryContainer';
import  SprintContainer  from './containers/sprints/SprintContainer';

library.add(faTrash, faEdit, faPlus);

function App() {
  return (
    <div className="App container">
      <ProjectContainer/>
      <UserStoryContainer/>
      <SprintContainer/>
    </div>
  );
}

export default App;
