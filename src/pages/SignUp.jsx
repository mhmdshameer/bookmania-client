
import React, { useState } from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom';
import { signup } from '../action/auth';

// Styled components
const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
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

const SignUpButton = styled.button`
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

const LoginLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 0.5rem;
  color: #4a90e2;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }`;


const initialState = {
    username: '',
    email: '',
    password: '', 
  };


const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]: [e.target.value]})
  }
 

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signup(formData, navigate))
  };

  return (
    <SignUpContainer>
      <FormWrapper>
        <Title>Sign Up</Title>
        <form onSubmit={handleSignUp}>
          <InputField
            type="text"
            name='username'
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <InputField
            type="email"
            name='email'
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <InputField
            type="password"
            name='password'
            placeholder="Password"
            onChange={ handleChange}
            required
          />
          <SignUpButton type="submit">Sign Up</SignUpButton>
        </form>
        <LoginLink href="/signin">Already have an account? Log in</LoginLink>
      </FormWrapper>
    </SignUpContainer>
  );
};

export default SignUp;
