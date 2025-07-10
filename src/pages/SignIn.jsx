import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useDispatch } from "react-redux";
import { signin } from "../action/auth";
import { useNavigate } from "react-router-dom";

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 10px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  color: #333;
  background-color: #f9f9f9;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4a90e2;
  }
`;

const SignInButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #4a90e2;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357abd;
  }
`;

const CreateAccount = styled.a`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #4a90e2;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 1rem;
`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShow((prev) => !prev);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    try {
      await dispatch(signin({ email, password }, navigate)); 
    } catch (error) {
      setErrorMessage(error.message); // Set error message on catch
    }
  };

  return (
    <SignInContainer>
      <FormWrapper>
        <Title>Sign In</Title>
        <form onSubmit={handleSignIn}>
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type={show ? "text" : "password"}
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {show ? (
                      <MdOutlineVisibility />
                    ) : (
                      <MdOutlineVisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <SignInButton type="submit">Sign In</SignInButton>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} {/* Display error message */}
        </form>
        <CreateAccount href="/signup">Don't you have an account?</CreateAccount>
      </FormWrapper>
    </SignInContainer>
  );
};

export default SignIn;
