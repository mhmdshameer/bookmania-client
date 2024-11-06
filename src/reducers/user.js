// userReducer.js
const userReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "FETCH_USERS": {
     // localStorage.setItem("users", JSON.stringify(action.payload)); 
      return { ...state, users: action.payload };
    }
    case "DELETE_USER": {
      const updatedUsers = state.users.filter(
        (user) => user._id !== action.payload
      );
      
      return {
        ...state,
        users: updatedUsers,
      };
    }
    case "UPDATE_USER": {
      const updatedUsers = state.users.map(
        (user) => user._id === action.payload._id? action.payload: user 
      );
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
    case "RETURN": {
      const { userId, bookId } = action.payload;
      console.log("user:",userId,"book:",bookId)
      console.log("user:", userId, "book:", bookId);

      const updatedUsers = state.users.map((user) =>
        user._id === userId
          ? {
              ...user,
              book: user.book.filter((id) => id !== bookId), 
            }
          : user
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
