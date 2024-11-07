import { Container, Grid2, Grow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../components/posts/posts";
import * as api from "../api/index.js"
import { useDispatch } from "react-redux";
import Recommended from "../components/Recommended.jsx";

const Home = ({searchWord}) => {
 const [posts, setPosts] = useState([])
 const [searchPosts, setSearchPosts] = useState({})
 const searchedWord = searchWord
 const dispatch = useDispatch()
  useEffect(()=>{
    const getPosts= async ()=>{
    const {data} = await api.fetchPosts();
    dispatch({type: "FETCH",payload:data})
    setPosts(data)
    }
    getPosts()
   },[])
   
   useEffect(()=>{
     const getSearchPost = async () => {
       const {data} = await api.fetchSearchPosts(searchedWord);
       setSearchPosts(data)
      }
      getSearchPost()
    },[searchedWord])

  return (
    <Grow in>
      <Container
      sx={{
        marginTop: "70px"
      }}
      >
        <Grid2
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}
        >
       {searchWord && searchPosts.length > 0 &&(

            <Grid2 item xs={12} sm={9} md={6} >
            <Typography variant="h5" align="center" sx={{mb: 2, mt: 2, color: "#E5E4E2"}}>{searchPosts.length>1?"Searched Posts":"Search Post"}</Typography>
               <Recommended posts={searchPosts}/> 
            </Grid2>
        )}

        { searchPosts.length === 0 &&(    
            <Grid2 item xs={12} sm={9} md={6} >
            <Typography variant="h5" align="center" sx={{mb: 2, mt: 2, color: "#D4AF37"}}>Recommended</Typography>
               <Recommended posts={posts}/> 
            </Grid2>
        )}
            <Grid2 item xs={12} sm={9} md={6} >
            <Typography variant="h5" align="center" sx={{mb: 2, mt: 2, color: "#ffff"}}>All Books</Typography>
               <Posts posts={posts}/> 
            </Grid2>
        </Grid2>
      </Container>
    </Grow>
  );
};

export default Home;
