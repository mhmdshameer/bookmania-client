const authReducers = (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...state, authData: action.payload };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, authData: null };
    case "TAKE": {
      const { userId, bookId } = action.payload;
      console.log("bookId",bookId,"userId:",userId);

      // Check if the logged-in user matches the action's userId
      if (state.authData?.result?._id === userId) {
        const updatedUser = {
          ...state.authData.result,
          book: [...state.authData.result.book, bookId],
        };

        const updatedAuthData = {
          ...state.authData,
          result: updatedUser,
        };

        // Update localStorage with the new book information for the user
        localStorage.setItem("profile", JSON.stringify(updatedAuthData));

        return { ...state, authData: updatedAuthData };
      }

      return state; // If the userId doesn't match, return the state as-is
    }

    default:
      return state;
  }
};

export default authReducers;
