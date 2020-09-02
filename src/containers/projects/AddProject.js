import React from 'react'
import {connect} from 'react-redux'
import {addProject} from '../../actions/'

const AddProject= ({dispatch})=>{
    let input
    
    return (
        <div className="w-100">
            <form className="form-inline"
            onSubmit={e=>{
                e.preventDefault()
                if(!input.value.trim()){
                    return
                }
                dispatch(addProject(dispatch,input.value))
                input.value=''
            }}
            >
                
                <input type="text" className="form-control  mb-2 mr-sm-2 mt-2" ref={node=>( input = node)} placeholder="New Project Name"/>
                <button type="submit" className="btn btn-primary mb-2 mr-sm-2 mt-2">Add</button>
            </form>
        </div>
    )
}

export default connect()(AddProject)