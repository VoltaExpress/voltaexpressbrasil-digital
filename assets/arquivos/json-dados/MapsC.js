import React from "react";
import { CssBaseline, Box, Container, Paper, Typography } from "@mui/material";

import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import SportsScoreOutlinedIcon from "@mui/icons-material/SportsScoreOutlined";
import PaletteIcon from "@mui/icons-material/Palette";
import { pink } from "@mui/material/colors";
import LocalMallIcon from "@mui/icons-material/LocalMall";

function TooltipOrigem() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <span>
      <IconButton onClick={handleClick}>
        <LocalMallIcon color="success" sx={{ fontSize: 28 }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 1 }}>Local de Origem da Carga</Typography>
      </Popover>
    </span>
  );
}

function TooltipDestino() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <span>
      <IconButton onClick={handleClick}>
        <SportsScoreOutlinedIcon color="secondary" sx={{ fontSize: 30 }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 1 }}>Local de Destino da Carga</Typography>
      </Popover>
    </span>
  );
}

function TooltipPaleta() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <span>
      <IconButton onClick={handleClick}>
        <PaletteIcon sx={{ color: pink[500], fontSize: 28 }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 1, width: 220 }}>
          A paleta de cores conecta diretamente a carga de Origem à carga de
          Destino
        </Typography>
      </Popover>
    </span>
  );
}

export default function MapsC(props) {
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
          <Typography
            component="h1"
            variant="h4"
            align="right"
            sx={{
              mb: 1.5,
            }}
          >
            <TooltipOrigem />
            <TooltipDestino />
            <TooltipPaleta />
          </Typography>
          <Box sx={{ bgcolor: "#cfe8fc", width: "350", height: "400" }}>
            <iframe
              title="Google Maps de carga"
              src="https://www.google.com/maps/d/embed?mid=1Ywi7AEJi7RkzEVGJX5CCvnz7ajSmy3g&ehbc=2E312F&ll=-16.671913511766096%2C-68.70217983345472&z=3"
              width="100%"
              height="400"
              sx={{ width: "100%", height: "350" }}
            ></iframe>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
/**
 
 Mundo:
 https://www.google.com/maps/d/embed?mid=1Ywi7AEJi7RkzEVGJX5CCvnz7ajSmy3g&ehbc=2E312F

 Brasil:
 https://www.google.com/maps/d/embed?mid=1Ywi7AEJi7RkzEVGJX5CCvnz7ajSmy3g&ehbc=2E312F&ll=-16.671913511766096%2C-68.70217983345472&z=3

 Juiz de Fora:
 https://www.google.com/maps/d/embed?mid=1Ywi7AEJi7RkzEVGJX5CCvnz7ajSmy3g&ehbc=2E312F&ll=-21.757044853210292%2C-43.35096350639521&z=15

 adicionar as coordenadas: parque halfeld JF
 &ll=-21.757044853210292%2C-43.35096350639521&z=15
 
 */
