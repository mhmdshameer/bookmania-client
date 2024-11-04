import * as api from "../api/index"

export const createPost =  (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);
        dispatch({type: "CREATE", payload: data});        
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id,post) => async (dispatch) => {
    console.log("getPost in action rendered")
    try {
        const {data} = await api.updatePost(id,post);
        dispatch({type: "UPDATE", payload: data});
    } catch (error) {
        console.log(error)
    }
}