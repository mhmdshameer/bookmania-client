import { Grid2 } from '@mui/material'
import React from 'react'
import Post from './posts/post/post'

const Recommended = ({posts}) => {
  const demandPosts = [...posts].sort((a,b) => b.demand - a.demand).slice(0,6)
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
     {demandPosts.map((post)=>(
      <Grid2 key={post._id} item xs={12} sm={6} md={4} lg={3}>
        <Post post={post} />
      </Grid2>
     ))}
    </Grid2>
  )
}

export default Recommended
