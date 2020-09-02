import React from 'react'
import Sprint from './Sprint'

export default function SprintList(props) {
    const sprints=props.sprints||[]
    return (
        <div>
            {sprints.map(sprint=>
                <Sprint key={sprint.id} {...sprint} currentProjectId={props.currentProjectId} deleteSprint={props.deleteSprint}/>
                )}
        </div>
    )
}
