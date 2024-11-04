// userReducer.js
const userReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "FETCH_USERS": {
      localStorage.setItem("users", JSON.stringify(action.payload)); // Save users to local storage
      return { ...state, users: action.payload };
    }
    case "DELETE_USER": {
      const updatedUsers = state.users.filter((user) => user._id !== action.payload);
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save updated users to local storage
      return {
        ...state,
        users: updatedUsers,
      };
    }
    case "TAKE": {
      const { userId, id } = action.payload;

      // Update the specific user's book array in `users`
      const updatedUsers = state.users.map((user) =>
        user._id === userId ? { ...user, book: [...user.book, id] } : user
      );

      return {
        ...state,
        users: updatedUsers,
      };
    }
  
    default:
      return state;
  }
};

export default userReducer;
