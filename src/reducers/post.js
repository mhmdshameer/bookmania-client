const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case "FETCH": {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case "UPDATE": {
      return {
        ...state,
        posts: state.postReducer.posts.filter((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    }
    case "DELETE_POST": {
      return {
        ...state,
        posts: state.postReducer.posts.filter((post) =>
          post._id !== action.payload
        ),
      };
    }
    case "CREATE": {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }
    default:
      return state;
  }
};

export default postReducer;
