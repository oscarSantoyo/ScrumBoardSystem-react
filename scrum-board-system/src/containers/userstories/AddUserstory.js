import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUserstory } from '../../actions/userstories'

export const AddUserstory = ({ dispatch }) => {

    let title
    let points
    let description
    //TODO Use online as a placeholder until the real id is obtain by de state
    let projectId=1

    return (
        <div className="mt-2">
            <form className="form-inline"
                onSubmit={event => {
                    event.preventDefault()
                    const newUserstory={
                        title:title.value.trim(),
                        description:description.value.trim(),
                        weight:points.value.trim()
                    }
                    console.log("HISSSS ",newUserstory)
                    dispatch(addUserstory(dispatch,projectId,newUserstory))
                    title.value=''
                    description.value=''
                    points.value=''
                }}
            >
                <div className="form-row align-items-center">
                    <div className="col-auto mt-2">
                        <input type="text" className="form-control" placeholder="Title" ref={node=>(title=node)}/>
                    </div>
                    <div className="col-auto mt-2">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">USP</div>
                            </div>
                            <input type="text" className="form-control"  placeholder="User Story Points" ref={node=>(points=node)}/>
                        </div>
                    </div>
                    <div className="col-auto mt-2">
                        <div className="form-group">
                            <textarea className="form-control"  rows="3" placeholder="Description" ref={node=>(description=node)} />
                        </div>
                    </div>
                    <div className="col-auto mt-2">
                        <button type="submit" className="btn btn-primary" >Add</button>
                    </div>
                </div>


            </form>
        </div>
    )
}


export default connect()(AddUserstory)
