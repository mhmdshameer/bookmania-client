import { Container, Grid2, Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../components/posts/posts";
import * as api from "../api/index.js"
import { useDispatch } from "react-redux";

const Home = () => {
 const [posts, setPosts] = useState({})
 const dispatch = useDispatch()
  useEffect(()=>{
    const getPosts= async ()=>{
    const {data} = await api.fetchPosts();
    dispatch({type: "FETCH",payload:data})
    setPosts(data)
    }
    getPosts()
   },[])
  return (
    <Grow in>
      <Container
      sx={{
        marginTop: "10px"
      }}
      >
        <Grid2
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}
        >
            <Grid2 item xs={12} sm={9} md={6}>
               <Posts posts={posts}/> 
            </Grid2>
        </Grid2>
      </Container>
    </Grow>
  );
};

export default Home;
