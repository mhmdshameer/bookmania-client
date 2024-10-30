import React from 'react'
import styled from 'styled-components'
import SearchBar from './Searchbar'
import { Link } from 'react-router-dom'


const Container = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    background-color: #1E293B;
`
const RightSide = styled.div`
    width: 50%;
    height: 100%
`
const Title = styled.h1`
    color: #FBD38D;
    margin-left: 30px;
`
const LeftSide = styled.div`
    width: 50%;
    height: 100%;
    padding-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Button = styled.button`
    padding: 8px;
    margin-left: 5px;
    background-color: #FBD38D;
    border: none;
    border-radius: 5px;
    color:#1E293B;
`

const Navbar = () => {

  return (
    <Container>
    <RightSide>
        <Title>
            Bookmania
        </Title>
    </RightSide>
    <LeftSide>
        <SearchBar/>
        <Link to={'/signin'}>
        <Button>Sign In</Button>
        </Link>
        <Link to={'/signup'}>
        <Button>Sign Up</Button>
        </Link>
    </LeftSide>
    </Container>
  )
}

export default Navbar
