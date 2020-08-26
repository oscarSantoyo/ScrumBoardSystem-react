import React from 'react'
import { Button, Modal, Form, FormControl, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { addUserStory } from '../../actions/userstories'

const Sprint = ({sprint, sprints, register }) => {
    return (
<InputGroup className="mb-3">
    <DropdownButton
      as={InputGroup.Prepend}
      variant="outline-secondary"
      title="Sprint"
      id="input-group-dropdown-1"
    >
      <Dropdown.Item href="#">Action</Dropdown.Item>
      <Dropdown.Item href="#">Another action</Dropdown.Item>
      <Dropdown.Item href="#">Something else here</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#">Separated link</Dropdown.Item>
    </DropdownButton>
    <FormControl aria-describedby="basic-addon1" value="hola" />
  </InputGroup>



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

  const tasksMutated = [{id:12 }]
  console.log('mutated', tasksMutated)
    return (
      <div class="form-group row align-items-center">
        <div class="col-sm-2">Tasks</div>
        {tasksMutated && tasksMutated.map(task => (
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
  const {title, description, weight, labels, tasks, sprint, id, onSubmit } = props
  const { handleSubmit, register, error} = useForm()
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
const AddUserStory = ({project, show, handleClose, handleShow, addUserStory})=> {
  const onSubmit = (values) => {
    handleClose()
    addUserStory(project.id, values)
  }
  return (
      <Modal show={show} onHide={handleClose}
             size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserStory
            onSubmit={onSubmit}
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

const mapStateToProps = (state) => ({
  project: state.projects.project,
  sprints: state.sprints,
})

const mapDispatchToProps = (dispatch) => ({
  addUserStory: (projectId, values) => dispatch(addUserStory(dispatch, projectId, values))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUserStory);
