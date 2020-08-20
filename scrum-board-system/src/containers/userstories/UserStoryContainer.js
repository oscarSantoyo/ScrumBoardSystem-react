import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getUserstories} from '../../actions/userstories'
import UserstoryList from '../../components/userstories/UserstoryList'

export const UserStoryContainer = ({userstories,getUserstories,deleteUserstory}) => {
    useEffect(() => {
        getUserstories()
    }, [])
    return (
        <div className="">
            <h3>Project's User Stories</h3>
            <UserstoryList userstories={userstories}/>
        </div>
    )
}



const mapStateToProps = (state) => ({
    userstories:state.userstories
})

const mapDispatchToProps = dispatch=>({
    getUserstories:()=>dispatch(getUserstories(dispatch))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserStoryContainer)
