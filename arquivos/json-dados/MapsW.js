import React from "react";
import { CssBaseline, Box, Container, Paper } from "@mui/material";

export default function MapsW(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="100%"
        sx={{
          mb: 4,
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 1, md: 1 },
            p: { xs: 1, md: 1 },
          }}
        >
          <Box sx={{ bgcolor: "#cfe8fc" }}>
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/LzvZOK6IF4o?si=S8gJa-w_Y_NlqDUi"
              title="Como usar o Volta Express"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
/**
 https://www.google.com/maps/d/embed?mid=1Ywi7AEJi7RkzEVGJX5CCvnz7ajSmy3g&ehbc=2E312F

 adicionar as coordenadas: parque halfeld JF
 &ll=-21.757044853210292%2C-43.35096350639521&z=15
 */
