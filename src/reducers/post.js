// postReducer.js
const postReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
      case "FETCH": {
        const updatedState = {
          ...state,
          posts: action.payload,
        };
        localStorage.setItem("posts", JSON.stringify(updatedState.posts)); // Save posts to local storage
        return updatedState;
      }
      case "UPDATE": {
        const updatedPosts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Save updated posts to local storage
        return {
          ...state,
          posts: updatedPosts,
        };
      }
      case "DELETE_POST": {
        const updatedPosts = state.posts.filter((post) => post._id !== action.payload);
        localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Save updated posts to local storage
        return {
          ...state,
          posts: updatedPosts,
        };
      }
      case "CREATE": {
        const updatedPosts = [action.payload, ...state.posts];
        localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Save created post to local storage
        return {
          ...state,
          posts: updatedPosts,
        };
      }
      case "TAKE": {
        const id = action.payload.id;
        const updatedPosts = state.posts.map((post) =>
          post._id === id ? { ...post, demand: post.demand + 1 } : post
        );
        localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Save updated posts to local storage
        return {
          ...state,
          posts: updatedPosts,
        };
      }
      default:
        return state;
    }
  };
  
  export default postReducer;
  