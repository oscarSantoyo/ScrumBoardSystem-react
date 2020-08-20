const userstories = (state = [], action)=>{
    switch(action.type){
        case 'FETCH_USERS_STORIES':
            return state
        case 'FETCHED_USER_STORIES':
            return [...state,...action.userstories]
        default:
            return state
    }
}

export default userstories