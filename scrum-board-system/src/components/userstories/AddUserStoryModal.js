import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

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
  const {title, description, weight, labels, tasks, sprint, id } = props
  const { handleSubmit, register, error} = useForm()
  const onSubmit = (values) => console.log('value', values)
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
          <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" ref={register} name="title" id="title" value={title}/>
            </div>
          </div>
          <div class="form-group row">
            <label for="description" class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
              <input type="textarea" class="form-control" ref={register} name="description" id="description" value={description}/>
            </div>
          </div>
          <div class="form-group row">
            <label for="weight" class="col-sm-2 col-form-label">Weight</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" ref={register} name="weight" id="weight" value={weight}/>
            </div>
          </div>
          <Sprint sprint={sprint} />
          <LabelContainer labels={labels}/>
          <TasksContainer tasks={tasks}/>
          <input type="submit" className="btn btn-primary" value="ADD"/>
    </form>
        </>
  )
}
const AddUserStory = ({show, handleClose, handleShow})=> {

  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserStory
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default AddUserStory;
