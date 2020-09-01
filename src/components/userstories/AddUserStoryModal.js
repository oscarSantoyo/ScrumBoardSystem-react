import React, {useState, useEffect} from 'react'
import { Button, Modal, FormControl, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap'
import { useForm,useFieldArray } from 'react-hook-form'
import { connect } from 'react-redux'
import { addUserStory } from '../../actions/userstories'
import {fetchLabels} from '../../actions/labels'
import ReactTags from 'react-tag-autocomplete'


const Sprint = ({sprint, sprints, register }) => {
  const [sprintValue, setSprintValue] = useState(sprint?.name)
  const [sprintId, setSprintId] = useState(sprint?.id)

  const onChange = (change) => {
                               setSprintId(change)
                               setSprintValue(sprints.find(spr => spr.id == change).name)
                              }
    return (
      <div className="form-group row">
        <InputGroup className="col-sm-2">
          <DropdownButton
            as={InputGroup.Prepend}
            variant="outline-secondary"
            title="Sprint"
            id="input-group-dropdown-1"
            onSelect={onChange}>
            {sprints && sprints.map(sprintObj => (
              <Dropdown.Item key={sprintObj.id} eventKey={sprintObj.id}> {sprintObj.name}</Dropdown.Item>
            ))}
          </DropdownButton>

          <div className="col-sm-3">
            {sprintValue &&
             <a id="SprintId" className="badge badge-pill badge-primary"> {sprintValue} </a>
            }
          </div>
          <FormControl type="text" readOnly hidden aria-describedby="basic-addon1" ref={register} name="sprint.id" value={ sprintId } />
        </InputGroup>
      </div>
    )
}

const LabelContainer = ({labels,labelsCatalog,setLabelTagsHandler}) => {
    const selectedLabels=(labels||[]).map(label=>{return {id:label.id , name:label.description}})
    const [suggestions, setSuggestions] = useState(labelsCatalog.map(label=>{return {id:label.id , name:label.description}}))
    const [tags,setTags]=useState(selectedLabels)

    const onDelete=(index)=>{
      setTags(tags.filter((tags,i)=> index!=i))
    }

    const onAddition =(tag) =>{
      if(!tags.includes(tag)){
        setTags([...tags,tag])
      }
      
    }

    useEffect(()=>{
      setLabelTagsHandler(tags)
    },[tags])
    return (
      <div class="form-group row">
        <label for="Labels" class="col-sm-2 col-form-label">Labels</label>
        <div class="center">
        <ReactTags
        style={{color: "red"}}
        tags={tags}
        removeButtonText="remove label"
        onAddition={onAddition}
        onDelete={onDelete}
        allowNew="true"
        autoresize={false}
        name="labels"
        placeholderText="Add a label"
        allowBackspace="false"
        suggestions={suggestions}/>
        </div>
      </div>
    )
}

const Task = ({task,register,index,onEnterPressed}) => {
  const [taskState, setTaskState] = useState(task)
  
  const handleKey=(event)=>{
    if(event.key==='Enter'){
      onEnterPressed()
    }
  }
  return (
    <div key={taskState?.id} class="input-group w-100 mt-2 ml-3 mr-3">
      <FormControl type="text" readOnly hidden name={`tasks[${index}].id`} value={task.id} ref={register}/>
      <div class="input-group-prepend">
        <div class="input-group-text">
          <input type="checkbox" aria-label="Checkbox for following text input" checked={taskState?.done} name={`tasks[${index}].done`} ref={register}/>
        </div>
      </div>
      <input type="text" class="form-control" aria-label="Text input with checkbox" defaultValue={taskState?.description} name={`tasks[${index}].description`} ref={register} onKeyDown={handleKey}/>
    </div>
  )
}
const TasksContainer = ({tasks,register}) => {
  const [tasksMutated,setTaskMutated]=useState(!!tasks?tasks:[{}])
  const newTaskEnter=()=>{
    setTaskMutated([...tasksMutated,{}])
  }
    return (
      <div class="form-group row">
        <div class="col-sm-2">Tasks</div>
        {tasksMutated && tasksMutated.map((task,index) => (
          <>
          <div className="col-sm-2"></div>
          <Task key={task.id}
          task={task} register={register} index={index} onEnterPressed={newTaskEnter}/>
          </>
        ))}
        
      </div>
    )
}

const UserStory = (props) => {
  const { sprints,userStoryEdit, onSubmit,setLabelTagsHandler } = props
  const labelsCatalog=props.labels
  const {title,description,weight, labels, tasks, sprint, id } = userStoryEdit
  const { handleSubmit, register, error,control} = useForm()
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "tasks"
  }); 


  return (
    <>
      <form>
      <FormControl type="text" readOnly hidden ref={register} name="id" id="id" value={ id } />
        <div class="form-group row">
          <label for="title" class="col-sm-2 col-form-label">Title</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" ref={register} name="title" id="title" defaultValue={title}/>
          </div>
        </div>
        <div class="form-group row">
          <label for="description" class="col-sm-2 col-form-label">Description</label>
          <div class="col-sm-10">
            <input type="textarea" class="form-control" ref={register} name="description" id="description" defaultValue={description} />
          </div>
        </div>
        <div class="form-group row">
        <label for="weight" class="col-sm-2 col-form-label">Weight</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" ref={register} name="weight" id="weight" defaultValue={weight}/>
        </div>
      </div>
      <Sprint sprint={sprint} sprints={sprints} register={register} />
      <LabelContainer labels={labels} labelsCatalog={labelsCatalog} setLabelTagsHandler={setLabelTagsHandler} />
      <TasksContainer tasks={tasks} register={register}/>
      <input type="button" onClick={handleSubmit(onSubmit)} className="btn btn-primary" value={(id!=null)?"SAVE":"ADD"}/>
    </form>
        </>
  )
}
const AddUserStory = ({project, sprints,labels,userStoryEdit, show, handleClose, addUserStory,fetchLabels})=> {
  const [labelTags,setLabelTags]=useState([])
  const {id}=userStoryEdit
  const onSubmit = (values) => {
    values.labels=labelTags.map(tag=>{return {id:tag.id,description:tag.name}})
    handleClose()
    addUserStory(project.id, values)
    setLabelTags([])
  }

  const setLabelTagsHandler=(labelTags)=>{
    setLabelTags(labelTags)
  }

  useEffect(()=>{
    fetchLabels()
  },[])
  return (
      <Modal show={show} onHide={handleClose}
             size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{(id!=null)?"Edit User Story":"Add a User Story"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserStory
            userStoryEdit={userStoryEdit}
            onSubmit={onSubmit}
            sprints={sprints}
            labels={labels}
            setLabelTagsHandler={setLabelTagsHandler}
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
  labels:  state.labels.labels
})

const mapDispatchToProps = (dispatch) => ({
  addUserStory: (projectId, values) => dispatch(addUserStory(dispatch, projectId, values)),
  fetchLabels:()=>dispatch(fetchLabels(dispatch))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUserStory);
