import * as api from "../api/index.js";

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log(data);
    dispatch({ type: "AUTH", payload: data });

    navigate("/");
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

export const signin =
  ({ email, password }, navigate) =>
  async (dispatch) => {
    try {
      const { data } = await api.signIn({ email, password });
      console.log(data);
      dispatch({ type: "AUTH", payload:{ result: data.result, token: data.token } });
      console.log("dispatched");
      navigate("/");
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : "An error occurred. Please try again.";
      throw new Error(message);
    }
  };
