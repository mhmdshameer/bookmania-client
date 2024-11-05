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
      
      if (state.authData?.result?._id === userId) {
        const updatedUser = {
          ...state.authData.result,
          book: [...state.authData.result.book, bookId],
        };

        const updatedAuthData = { ...state.authData, result: updatedUser };
        
        return { ...state, authData: updatedAuthData };
      }

      return state;
    }
    
    case "RETURN": {
      const { bookId } = action.payload;
    console.log("book:",bookId)
      const updatedAuthData = {
        ...state.authData,
        result: {
          ...state.authData.result,
          book: state.authData.result.book.filter((id) => id !== bookId),
        },
      };

      return { ...state, authData: updatedAuthData };
    }

    default:
      return state;
  }
};

export default authReducers;
