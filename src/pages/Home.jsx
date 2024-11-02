import { Container, Grid2, Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../components/posts/posts";
import * as api from "../api/index.js"

const Home = ({setCurrentId}) => {
 const [posts, setPosts] = useState({})
  useEffect(()=>{
    const getPosts= async ()=>{
    const {data} = await api.fetchPosts();
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
               <Posts posts={posts} setCurrentId= {setCurrentId}/> 
            </Grid2>
        </Grid2>
      </Container>
    </Grow>
  );
};

export default Home;
