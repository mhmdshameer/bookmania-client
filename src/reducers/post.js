// postReducer.js
const postReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
      case "FETCH": {
        const updatedState = {
          ...state,
          posts: action.payload,
        };
        localStorage.setItem("posts", JSON.stringify(updatedState.posts)); // Save posts only during fetch
        return updatedState;
      }
      case "UPDATE": {
        const updatedPosts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        return {
          ...state,
          posts: updatedPosts, // Avoid redundant storage update
        };
      }
      case "DELETE_POST": {
        const updatedPosts = state.posts.filter((post) => post._id !== action.payload);
        return {
          ...state,
          posts: updatedPosts, // Avoid redundant storage update
        };
      }
      case "CREATE": {
        const updatedPosts = [action.payload, ...state.posts];
        return {
          ...state,
          posts: updatedPosts, // Avoid redundant storage update
        };
      }
      case "TAKE": {
        const id = action.payload.id;
        const updatedPosts = state.posts.map((post) =>
          post._id === id ? { ...post, demand: post.demand + 1,available: false } : post
        );
        return {
          ...state,
          posts: updatedPosts, // Avoid redundant storage update
        };
      }
      case "RETURN": {
        const id = action.payload.id;
        const updatedPosts = state.posts.map((post)=> post._id === id? {...post,available:true}: post);
        return{
            ...state, posts: updatedPosts,
        }
      }
      default:
        return state;
    }
  };
  
  export default postReducer;
  