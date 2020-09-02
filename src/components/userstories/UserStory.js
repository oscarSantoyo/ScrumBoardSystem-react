import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Sprint = ({ sprint }) => {
    return (
          <div class="form-group row">
            <label for="SprintId" class="col-sm-2 col-form-label">Sprint</label>
            <div class="col-sm-2">
              {sprint &&
              <a id="SprintId" className="badge badge-pill badge-primary"> {sprint.name} </a>
              }
            </div>
          </div>
    )
}

const LabelContainer = ({labels}) => {
    return (
          <div class="form-group row">
            <label for="SprintId" class="col-sm-2 col-form-label">Labels</label>
            <div class="col-sm-2 center">
              {labels && labels.map(label => {
                  return (
                      <a key={label.id} className="badge badge-pill badge-info"> {label.name} </a>
                  )
              })}
            </div>
          </div>
    )
}

const TasksContainer = ({tasks}) => {
    return (
          <div class="form-group row align-items-center">
            <div class="col-sm-2">Tasks</div>
            {tasks && tasks.map(task => (
                <div key={task.id} class="input-group mb-3">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="checkbox" aria-label="Checkbox for following text input"/>
                    </div>
                  </div>
                  <input type="text" class="form-control" aria-label="Text input with checkbox"/>
                </div>
            ))}
          </div>
    )
}

const UserStory = (props) => {
  const {title, description, weight, labels, tasks, sprint, id} = props
  return (
    <div className="card">
      <div className="card-header" id="headingOne">
        <h2 className="mb-0">
          <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                  data-target={`#collapse${id}`} aria-expanded="true" aria-controls={`#collapse${id}`}>
            {title}
          </button>
        </h2>
      </div>
      <div id={`collapse${id}`} className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div className="card-body">
          <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
              <input type="text" class="form-control-plaintext" id="description" value={title}/>
            </div>
          </div>
          <div class="form-group row">
            <label for="description" class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
              <input type="textarea" readOnly class="form-control-plaintext" id="description" value={description}/>
            </div>
          </div>
          <div class="form-group row">
            <label for="weight" class="col-sm-2 col-form-label">Weight</label>
            <div class="col-sm-10">
              <input type="text" readOnly class="form-control-plaintext" id="weight" value={weight}/>
            </div>
          </div>
          <Sprint sprint={sprint} />
          <LabelContainer labels={labels}/>
          <TasksContainer tasks={tasks}/>
        </div>
      </div>
    </div>
  )
}

export default UserStory
