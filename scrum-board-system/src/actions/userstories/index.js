import axios from 'axios'

export const getUserstories=(dispatch)=>{
    axios.get('/apiprojects/projects/userstories')
    .then(res=>res.data)
    .then(userstories=>{ dispatch(fetchedUserstories(userstories))})
    return {
        type:"FETCH_USER_STORIES"
    }   
}

export const fetchedUserstories=userstories=>({
    type: "FETCHED_USER_STORIES",
    userstories
})