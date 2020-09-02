import React, { Component } from "react";
import { connect } from "react-redux";
import { addSprint } from "../../actions/";
import { useForm } from "react-hook-form";
// import { Formik, Field, Form, ErrorMessage,withFormik } from 'formik';

export const AddSprint = ({ currentProjectId }) => {
  const { handleSubmit, register, error } = useForm();
  const onSubmit = (values) => console.log("values: ", values);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" ref={register} className="form-control" />
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  currentProjectId: state.global.currentProjectId,
});

const mapDispatchToProps = (dispatch) => ({
  addSprint: (currentProjectId, newSprint) =>
    dispatch(addSprint(dispatch, currentProjectId, newSprint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSprint);
