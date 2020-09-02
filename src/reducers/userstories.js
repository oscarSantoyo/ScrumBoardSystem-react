const userstories = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_USERS_STORIES':
            return state
        case 'FETCHED_USER_STORIES':
            return action.userstories
        case 'ADD_USER_STORY':
            return state
        case 'ADDED_USER_STORY':
            return state
        case 'DELETE_USER_STORY':
            return state
        case 'DELETED_USER_STORY':
            return state
        default:
            return state
    }
}

export default userstories
