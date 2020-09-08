import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  FormControl,
  InputGroup,
  Dropdown,
  DropdownButton,
  Form,
  Badge,
  Alert,
} from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { connect } from "react-redux";
import { addUserStory, fetchLabels, cleanError } from "../../actions/";
import ReactTags from "react-tag-autocomplete";
import ConfirmationModal from "../shared/ConfirmationModal";

const Sprint = ({ sprint, sprints, register }) => {
  const [sprintValue, setSprintValue] = useState(sprint?.name);
  const [sprintId, setSprintId] = useState(sprint?.id);

  const onChange = (change) => {
    setSprintId(change);
    setSprintValue(sprints.find((spr) => spr.id == change).name);
  };
  return (
    <div className="form-group row">
      <InputGroup className="col-sm-2">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title="Sprint"
          id="input-group-dropdown-1"
          onSelect={onChange}
        >
          {sprints &&
            sprints.map((sprintObj) => (
              <Dropdown.Item key={sprintObj.id} eventKey={sprintObj.id}>
                {" "}
                {sprintObj.name}
              </Dropdown.Item>
            ))}
        </DropdownButton>

        <div className="col-sm-3">
          {sprintValue && (
            <Badge id="SprintId" variant="primary">
              {" "}
              {sprintValue}{" "}
            </Badge>
          )}
        </div>
        <FormControl
          type="text"
          readOnly
          hidden
          aria-describedby="basic-addon1"
          ref={register}
          name="sprint.id"
          value={sprintId}
        />
      </InputGroup>
    </div>
  );
};

const LabelContainer = ({ labels, labelsCatalog, setLabelTagsHandler }) => {
  const selectedLabels = (labels || []).map((label) => {
    return { id: label.id, name: label.description };
  });
  const [suggestions, setSuggestion] = useState(
    labelsCatalog.map((label) => {
      return { id: label.id, name: label.description };
    })
  );
  const [tags, setTags] = useState(selectedLabels);

  const onDelete = (index) => {
    setTags(tags.filter((tags, i) => index !== i));
  };

  const onAddition = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  useEffect(() => {
    setLabelTagsHandler(tags);
  }, [setLabelTagsHandler, tags]);
  return (
    <Form.Group className="row">
      <Form.Label className="col-sm-2 col-form-label">Labels</Form.Label>
      <div className="center">
        <ReactTags
          tags={tags}
          removeButtonText="remove label"
          onAddition={onAddition}
          onDelete={onDelete}
          allowNew="true"
          autoresize={false}
          name="labels"
          placeholderText="Add a label"
          allowBackspace="false"
          suggestions={suggestions}
        />
      </div>
    </Form.Group>
  );
};

const Task = ({ task, register, index, onEnterPressed }) => {
  const handleKey = (event) => {
    if (event.key === "Enter") {
      onEnterPressed();
    }
  };
  return (
    <InputGroup key={task?.id} className="w-100 mt-2 ml-3 mr-3">
      <FormControl
        type="text"
        readOnly
        hidden
        name={`tasks[${index}].id`}
        value={task.id}
        ref={register}
      />
      <FormControl
        type="text"
        readOnly
        hidden
        name={`tasks[${index}].order`}
        value={index + 1}
        ref={register}
      />
      <InputGroup.Prepend>
        <div class="input-group-text">
          <Form.Check
            type="checkbox"
            aria-label="Checkbox for done tasks"
            defaultChecked={task?.done}
            name={`tasks[${index}].done`}
            ref={register}
          />
        </div>
      </InputGroup.Prepend>
      <FormControl
        type="text"
        aria-label="Task's description"
        defaultValue={task?.description}
        name={`tasks[${index}].description`}
        ref={register}
        onKeyDown={handleKey}
      />
    </InputGroup>
  );
};
const TasksContainer = ({ tasks, register }) => {
  const [tasksMutated, setTaskMutated] = useState(
    !!tasks && tasks.length > 0 ? tasks : [{}]
  );
  const newTaskEnter = () => {
    setTaskMutated([...tasksMutated, {}]);
  };

  return (
    <div className="form-group row">
      <div className="col-sm-2">Tasks</div>
      {tasksMutated &&
        tasksMutated.map((task, index) => (
          <>
            <div className="col-sm-2"></div>
            <Task
              key={task.id}
              task={task}
              register={register}
              index={index}
              onEnterPressed={newTaskEnter}
            />
          </>
        ))}
    </div>
  );
};

const UserStory = (props) => {
  const {
    sprints,
    userStoryEdit,
    onSubmit,
    setLabelTagsHandler,
    handleSubmit,
    register,
    errors,
  } = props;
  const labelsCatalog = props.labels;
  const {
    title,
    description,
    weight,
    labels,
    tasks,
    sprint,
    id,
  } = userStoryEdit;

  return (
    <Form>
      <FormControl
        type="text"
        readOnly
        hidden
        ref={register}
        name="id"
        id="id"
        value={id}
      />
      <Form.Group className="row">
        <Form.Label className="col-sm-2 col-form-label">Title</Form.Label>
        <Form.Control
          className="col-sm-9 mr-1"
          type="text"
          ref={register}
          name="title"
          id="title"
          defaultValue={title}
        />
        <span className="col-sm-2"></span>
        <p className="col-sm-10 error-message">{errors.title?.message}</p>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="col-sm-2 col-form-label">Description</Form.Label>
        <Form.Control
          className="col-sm-9 mr-1"
          type="textarea"
          ref={register}
          name="description"
          id="description"
          defaultValue={description}
        />
        <span className="col-sm-2"></span>
        <p className="col-sm-10 error-message">{errors.description?.message}</p>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="col-sm-2 col-form-label">Weight</Form.Label>
        <Form.Control
          className="col-sm-9 mr-1"
          type="text"
          ref={register}
          name="weight"
          id="weight"
          defaultValue={weight}
        />
        <span className="col-sm-2"></span>
        <p className="col-sm-10 error-message">{errors.weight?.message}</p>
      </Form.Group>
      <Sprint sprint={sprint} sprints={sprints} register={register} />
      <LabelContainer
        labels={labels}
        labelsCatalog={labelsCatalog}
        setLabelTagsHandler={setLabelTagsHandler}
      />
      <TasksContainer tasks={tasks} register={register} />
      <Button variant="primary" onClick={handleSubmit(onSubmit)}>
        {id != null ? "SAVE" : "ADD"}
      </Button>
    </Form>
  );
};

const AddUserStory = ({
  project,
  sprints,
  labels,
  userStoryEdit,
  saveSucceeded,
  saving,
  show,
  handleClose,
  addUserStory,
  fetchLabels,
  cleanError,
}) => {
  const [labelTags, setLabelTags] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { id } = userStoryEdit;

  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    weight: yup.number().positive().integer().min(1).max(23).required(),
  });

  const { handleSubmit, register, control, errors, watch } = useForm({
    resolver: yupResolver(schema),
  });

  useFieldArray({
    control,
    name: "tasks",
  });

  const currentFieldsState = watch();

  const onSubmit = (values) => {
    values.labels = labelTags.map((tag) => {
      return { id: tag.id, description: tag.name };
    });
    addUserStory(project.id, values);
  };

  const setLabelTagsHandler = (labelTags) => {
    setLabelTags(labelTags);
  };

  const handlerCloser = () => {
    if (emptyFields()) {
      cleanError();
      handleClose();
    } else {
      setShowConfirmationModal(true);
    }
  };

  const emptyFields = () => {
    return (
      currentFieldsState.title === "" &&
      currentFieldsState.description === "" &&
      currentFieldsState.weight === "" &&
      currentFieldsState.sprint.id === "" &&
      currentFieldsState.tasks.length === 1 &&
      currentFieldsState.tasks[0].description === ""
    );
  };

  const handlerConfirmationModalDismiss = () => {
    setShowConfirmationModal(false);
  };

  const handlerConfirmationModalAccept = () => {
    setShowConfirmationModal(false);
    cleanError();
    handleClose();
  };

  useEffect(() => {
    if (!saving && saveSucceeded) {
      handleClose();
      setLabelTags([]);
    }
  }, [saveSucceeded, saving]);

  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);
  return (
    <>
      <ConfirmationModal
        showModal={showConfirmationModal}
        title="Are you sure you want to cancel this action?"
        body="You've already start to edit the new user story this action will cancel everything."
        handleDismiss={handlerConfirmationModalDismiss}
        handleAccept={handlerConfirmationModalAccept}
      />
      <Modal show={show} onHide={handlerCloser} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {id != null ? "Edit User Story" : "Add a User Story"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert show={!saveSucceeded && !saving} variant="danger">
            An error has ocurred trying to save, please try again!
          </Alert>
          <UserStory
            userStoryEdit={userStoryEdit}
            onSubmit={onSubmit}
            sprints={sprints}
            labels={labels}
            setLabelTagsHandler={setLabelTagsHandler}
            handleSubmit={handleSubmit}
            errors={errors}
            register={register}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlerCloser}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  project: state.projects.project,
  sprints: state.sprints,
  labels: state.labels.labels,
  saveSucceeded: state.userstories.saveSucceeded,
  saving: state.userstories.saving,
});

const mapDispatchToProps = (dispatch) => ({
  addUserStory: (projectId, values) =>
    dispatch(addUserStory(dispatch, projectId, values)),
  fetchLabels: () => dispatch(fetchLabels(dispatch)),
  cleanError: () => dispatch(cleanError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserStory);
