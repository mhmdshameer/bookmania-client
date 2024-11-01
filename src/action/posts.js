import * as api from "../api/index"

export const createPost =  (post) => async (dispatch) => {
    try {
        console.log(post)
        const {data} = await api.createPost(post);
        dispatch({type: "CREATE", payload: data});        
    } catch (error) {
        console.log(error)
    }
}