
const reducer= (state=[], action) => {
    switch (action.type) {
        case "FETCH":{
            return {
                ...state,
                posts: action.payload.data
            }
        }
        case "CREATE": {
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        }
        default: return state
    }
}
 
export default reducer;