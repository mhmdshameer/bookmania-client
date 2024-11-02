
const postReducer= (state= {posts:[]}, action) => {
    switch (action.type) {
        case "FETCH":{
            return {
                ...state,
                posts: action.payload
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
 
export default postReducer;