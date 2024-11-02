import * as api from "../api/index"

export const createPost =  (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);
        dispatch({type: "CREATE", payload: data});        
    } catch (error) {
        console.log(error)
    }
}

export const getPosts = () => async (dispatch) => {
    console.log("getPost in action rendered")
    try {
        const {data} = await api.fetchPosts();
        console.log(data)
        dispatch({type: "FETCH", payload: data});
    } catch (error) {
        console.log(error)
    }
}