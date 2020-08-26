import React, {useState} from 'react'
import { Button, Modal, Form, FormControl, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { addUserStory } from '../../actions/userstories'

const Sprint = ({sprint, sprints, register }) => {
  console.log('Sprints', sprints)
  const [sprintValue, setSprintValue] = useState(sprint?.name)

  const onChange = (change) => {console.log('This changed', change)
                               setSprintValue(sprints.find(spr => spr.id == change).name)
                              }
    return (
      <div className="form-group row">
        <InputGroup>
          <DropdownButton
            as={InputGroup.Prepend}
            variant="outline-secondary"
            title="Sprint"
            id="input-group-dropdown-1"
            onSelect={onChange}
          >
            {sprints && sprints.map(sprintObj => (
              <Dropdown.Item key={sprintObj.id} eventKey={sprintObj.id}> {sprintObj.name}</Dropdown.Item>
            ))}
          </DropdownButton>

          <div className="col-sm-2">
            {sprintValue &&
             <a id="SprintId" className="badge badge-pill badge-primary"> {sprintValue} </a>
            }
          </div>
          <FormControl type="text" readOnly hidden aria-describedby="basic-addon1" ref={register} name="sprint" value={ sprintValue } />
        </InputGroup>
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

const Task = ({task, onChange}) => {
  const [taskState, setTaskState] = useState(task)
  return (
    <div key={taskState?.id} class="input-group mb-3">
      <div class="input-group-prepend">
        <div class="input-group-text">
          <input type="checkbox" aria-label="Checkbox for following text input" checked={taskState?.done}/>
        </div>
      </div>
      <input type="text" class="form-control" aria-label="Text input with checkbox" value={taskState?.description}/>
    </div>
  )
}
const TasksContainer = ({tasks}) => {
  const tasksMutated = [{id:12, description: 'task 12', done:true }
                        , {id:1, description: 'task 1', done: false}]
  console.log('mutated', tasksMutated)
    return (
      <div class="form-group row align-items-center">
        <div class="col-sm-2">Tasks</div>
        {tasksMutated && tasksMutated.map(task => (
          <Task
          task={task}/>
        ))}
        <Task/>
      </div>
    )
}

const UserStory = (props) => {
  const {title, description, weight, labels, tasks, sprint, sprints, id, onSubmit } = props
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
      <Sprint sprint={sprint} sprints={sprints} register={register} />
      <LabelContainer labels={labels}/>
      <TasksContainer tasks={tasks}/>
      <input type="submit" className="btn btn-primary" value="ADD"/>
    </form>
        </>
  )
}
const AddUserStory = ({project, sprints, show, handleClose, handleShow, addUserStory})=> {
  const onSubmit = (values) => {
    console.log('values',  values)
    //handleClose()
    //addUserStory(project.id, values)
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
            sprints={sprints}
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
