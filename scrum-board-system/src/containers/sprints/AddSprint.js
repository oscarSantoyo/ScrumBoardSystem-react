import React,{Component} from 'react'
import { connect } from 'react-redux'
import { addSprint } from '../../actions/sprints'
import { Formik, Field, Form, ErrorMessage,withFormik } from 'formik';

export const AddSprint = ({currentProjectId,addSprint}) => {

    return (
        <Formik
            initialValues={{name:''}}
            onSubmit={this.addSprint(currentProjectId,this.values)}
        >
            <Form>
                <Field name="name" type="text" className="form-control"/>
                <ErrorMessage name="name" />
                <button type="submit" className="btn btn-primary">Add</button>
            </Form>
        </Formik>
    )
}

const mapStateToProps = (state) => ({
    currentProjectId:state.global.currentProjectId
})

const mapDispatchToProps =dispatch=>({
    addSprint:(currentProjectId,newSprint)=>dispatch(addSprint(dispatch,currentProjectId,newSprint))
})

export default connect(mapStateToProps, mapDispatchToProps)(withFormik({
    mapPropsToValues: () => ({ currentProjectId: currentProjectId }),
    handleSubmit: (values, { setSubmitting }) => {
        addSprint(2,values)
      }
}))(AddSprint)
