import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getUserstories, deleteUserstory} from '../../actions/userstories'
import UserstoryList from '../../components/userstories/UserstoryList'
import AddUserstory from './AddUserstory'

export const UserStoryContainer = ({userstories,currentProjectId,getUserstories,deleteUserStory}) => {
    
    useEffect(()=>{
        if(!!currentProjectId){
            getUserstories(currentProjectId)
        }
    },[currentProjectId])
    return (
        <div >
            <AddUserstory/>
            <h3>Project's User Stories</h3>
            <UserstoryList userstories={userstories} currentProjectId={currentProjectId} deleteUserStory={deleteUserStory}/>
        </div>
    )
}



const mapStateToProps = (state) => ({
    userstories:state.userstories,
    currentProjectId:state.global.projectId
})

const mapDispatchToProps = dispatch=>({
    getUserstories:projectId=>dispatch(getUserstories(dispatch,projectId)),
    deleteUserStory:(projectId,userStoryId)=>dispatch(deleteUserstory(dispatch,projectId,userStoryId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserStoryContainer)
