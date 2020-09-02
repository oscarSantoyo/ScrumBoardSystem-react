const sprints=(state=[],action)=>{
    switch(action.type){
        case 'FETCH_SPRINTS':
            return state
        case 'FETCHED_SPRINTS':
            return [...action.sprints]
        case 'ADD_SPRINT':
            return state
        case 'ADDED_SPRINT':
            return  [...state,{
                id:action.id,
                name:action.name
                }
            ]
        case 'DELETE_SPRINT':
            return state
            case 'DELETED_SPRINT':
                return state.filter(sprint=>sprint.id!==action.sprintId)
        default:
            return state;
    }
}

export default sprints