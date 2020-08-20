import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import './App.css';
import ProjectContainer from './containers/ProjectContainer';

library.add(faTrash, faEdit, faPlus);

function App() {
  return (
    <div className="App container">
      <ProjectContainer/>
    </div>
  );
}

export default App;
