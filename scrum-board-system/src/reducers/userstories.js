const userstories = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_USERS_STORIES':
            return state
        case 'FETCHED_USER_STORIES':
            return [...state, ...action.userstories]
        case 'ADD_USER_STORY':
            return state
        case 'ADDED_USER_STORY':
            const { newUserstory } = action
            return [...state, {
                id: newUserstory.id,
                title: newUserstory.title,
                description: newUserstory.description,
                weight: newUserstory.weight
            }]
        case 'DELETE_USER_STORY':
            return state
        case 'DELETED_USER_STORY':
            return state.filter(story=>story.id!==action.id)
        default:
            return state
    }
}

export default userstories