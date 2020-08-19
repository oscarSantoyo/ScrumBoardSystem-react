import React from 'react'
import {connect} from 'react-redux'
import {addProject} from '../actions'

const AddProject= ({dispatch})=>{
    let input
    
    return (
        <div>
            <form
            onSubmit={e=>{
                e.preventDefault()
                if(!input.value.trim()){
                    return
                }
                dispatch(addProject(input.value))
                input.value=''
            }}
            >
                <input ref={node=>( input = node)}/>
                <button type="submit">Add project</button>
            </form>
        </div>
    )
}

export default connect()(AddProject)