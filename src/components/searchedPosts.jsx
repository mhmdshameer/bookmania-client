import React from 'react'
import { Grid2 } from '@mui/material'
import Post from './posts/post/post'

const SearchedPosts = ({posts}) => {
  
  return (
    <Grid2
     container
     spacing={3}
     sx={{
        justifyContent:"center",
        width: "100%",
        mt: 2
     }}
    >
     {posts.map((post)=>(
      <Grid2 key={post._id} item xs={12} sm={6} md={4} lg={3}>
        <Post post={post} />
      </Grid2>
     ))}
    </Grid2>
  )
}

export default SearchedPosts;
