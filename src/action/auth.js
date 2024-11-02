import * as api from "../api/index.js";

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = api.signUp(formData);
     console.log(data)
    dispatch({ type: "AUTH", payload: data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signin = ({ email, password},navigate ) => async (dispatch) => {
  try {
      const { data } = await api.signIn({ email, password });
      console.log(data)
      dispatch({ type: "AUTH", payload: data });
      navigate("/");
  } catch (error) {
      const message = error.response ? error.response.data.message : 'An error occurred. Please try again.';
      throw new Error(message); 
  }
};
