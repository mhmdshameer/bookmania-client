// Import the required libraries
import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

// Styled components
const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 0.5rem;
  border-radius: 30px;
  background-color: #f3f4f6;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 5px;
  border-radius: 30px;
  font-size: 1rem;
  color: #333;
  background-color: transparent;
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: #333;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;

  &:hover {
    color: #4a90e2;
  }
`;

const SearchBar = ({onSearch}) => {
  const [searchWord, setSearchWord] = useState("");
 const handleChange = (e) => {
      setSearchWord(e.target.value)
 }
 const handleClick = (e) => {
   onSearch(searchWord)
 }

  
  return (

  <SearchBarContainer>
    <SearchInput type="text" placeholder="Search book" onChange={handleChange} />
    <SearchButton onClick={handleClick}>
      <SearchIcon size={18} />
    </SearchButton>
  </SearchBarContainer>
);
} 
export default SearchBar;
