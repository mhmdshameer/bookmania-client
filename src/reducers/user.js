const userReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "FETCH_USERS": {
      return { ...state, users: action.payload };
    }
    case "DELETE_USER": {
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default userReducer;
