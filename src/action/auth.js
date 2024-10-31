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
