import { Container, Grid2, Grow } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Grow in>
      <Container>
        <Grid2
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}
        >
            <Grid2 item xs={12} sm={9} md={6}>
                
            </Grid2>
        </Grid2>
      </Container>
    </Grow>
  );
};

export default Home;
