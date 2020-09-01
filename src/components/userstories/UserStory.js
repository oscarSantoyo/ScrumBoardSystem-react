import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap'
const Sprint = ({ sprint }) => {
  return (
    <div className="form-group row">
      <label htmlFor="SprintId" className="col-sm-2 col-form-label">Sprint</label>
      <div className="col-sm-2">
        {sprint &&
          <a id="SprintId" className="badge badge-pill badge-primary p-2"> {sprint.name} </a>
        }
      </div>
    </div>
  )
}

const LabelContainer = ({ labels }) => {
  return (
    <div className="form-group row">
      <label htmlFor="SprintId" className="col-sm-2 col-form-label">Labels</label>
      <div className="col-sm-2 center">
        {labels && labels.map(label => {
          return (
            <a key={label.id} className="badge badge-pill badge-info p-2"> {label.description} </a>
          )
        })}
      </div>
    </div>
  )
}

const Task = ({ task }) => {
  return (
    <div key={task.id} className="input-group mb-3">
      <div className="input-group-prepend">
        <div className="input-group-text">
          <input type="checkbox" aria-label="Checkbox for following text input" value={task.done} />
        </div>
      </div>
      <input type="text" className="form-control" aria-label="Text input with checkbox" value={task.description} disabled />
    </div>
  )
}

const TasksContainer = ({ tasks }) => {
  return (
    <div className="form-group row align-items-center">
      <div className="col-sm-2">Tasks</div>
      {tasks && tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  )
}

const UserStory = (props) => {
  const { userStory, deleteUserstory, projectId, setUserStoryEditHandler } = props
  const { title, description, weight, labels, tasks, sprint, id } = userStory
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  return (
    <div className="card">
      <ConfirmationModal
        showModal={showModal}
        projectId={projectId}
        deleteUserstory={deleteUserstory}
        userStoryId={id}
        handleClose={handleClose} />

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
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
              <input type="text" className="form-control-plaintext" id="description" value={title} readOnly />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-10">
              <input type="textarea" readOnly className="form-control-plaintext" id="description" value={description} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="weight" className="col-sm-2 col-form-label">Weight</label>
            <div className="col-sm-10">
              <input type="text" readOnly className="form-control-plaintext" id="weight" value={weight} />
            </div>
          </div>
          <Sprint sprint={sprint} />
          <LabelContainer labels={labels} />
          <TasksContainer tasks={tasks} />
          <div class="card-body text-right">
            <button class="btn btn-primary mr-2" onClick={() => setUserStoryEditHandler(userStory)} ><FontAwesomeIcon icon="edit" ></FontAwesomeIcon>Edit</button>
            <button class="btn btn-danger" onClick={() => handleShowModal()}><FontAwesomeIcon icon="trash" ></FontAwesomeIcon>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}


const ConfirmationModal = ({ showModal,userStoryId,projectId,deleteUserstory, handleClose }) => {
  const handleDeleteUserStory=()=>{
    deleteUserstory(projectId,userStoryId)
    handleClose()
  }
  return (
    <Modal show={showModal} onHide={handleClose}
      size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to delete this item?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The User Story will be eliminated and all the information related to it</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="danger" onClick={handleDeleteUserStory}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}


export default UserStory
