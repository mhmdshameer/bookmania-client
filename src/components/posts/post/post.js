import { ButtonBase, Card, CardMedia } from '@mui/material'
import React from 'react'

const post = ({post}) => {
    const openPost = () => {}
  return (
    <div>
      <Card
       raised
       elevation={6}
       sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "15px",
        height: "100%",
        position: "relative"
       }}
      >
        <ButtonBase
         component="div"
         onClick={openPost}
         sx={{
            display: "block",
            textAlign: "initial"
         }}
        >
        <CardMedia
         sx={{
            height: "100%",
            objectFit: "cover",
         }}
         image={post.selectedFile || "defaultImageURL"}
         title={post.title}
         />
        </ButtonBase>
      </Card>
    </div>
  )
}

export default post
