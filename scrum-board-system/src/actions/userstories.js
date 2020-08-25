import axios from 'axios'

export const getUserstories=(dispatch,projectId)=>{
    axios.get(`/apiprojects/projects/${projectId}/userstories`)
    .then(res=>res.data)
    .then(userstories=>{ dispatch(fetchedUserstories(userstories))})
    return {
        type:"FETCH_USER_STORIES"
    }   
}

export const fetchedUserstories=userstories=>{
    console.log('Received userstories', userstories)
    return {
    type: "FETCHED_USER_STORIES",
    userstories
    }
}

export const addUserstory=(dispatch,projectId,newUserstory)=>{
    axios.post(`/apiprojects/projects/${projectId}/userstories`,
    newUserstory)
    .then(res=>res.data)
    .then(userstory=>dispatch(addedUserstory(userstory)))
    return{
        type:"ADD_USER_STORY"
    }
}

export const addedUserstory=newUserstory=>({
    type:"ADDED_USER_STORY",
    newUserstory
})

export const deleteUserstory=(dispatch,projectId,userStoryId)=>{
    axios.delete(`/apiprojects/projects/${projectId}/userstories/${userStoryId}`)
    .then(res=>{
        if(res.status){
            dispatch(deletedUserstory(userStoryId))
        }})
    return {
        type:"DETELE_USER_STORY"
    }
}

export const deletedUserstory=(projectId,userStoryId)=>({
    type:"DELETED_USER_STORY",
    userStoryId
})
