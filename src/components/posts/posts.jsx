import { CircularProgress, Grid2 } from '@mui/material';
import Post from './post/post';

const Posts = ({posts}) => {
  
  return !posts.length ? (
  <CircularProgress/>
  ): (
    <Grid2
    container
    spacing={4}
    sx={{
      justifyContent: 'center',
      width: "100%", 
      marginTop: "30px"
    }}
  >
    {posts.map((post) => (
      <Grid2 key={post._id} item xs={6} sm={4} md={4} lg={3}> 
        <Post post={post}/>
      </Grid2>
    ))}
  </Grid2>
  )
}

export default Posts
