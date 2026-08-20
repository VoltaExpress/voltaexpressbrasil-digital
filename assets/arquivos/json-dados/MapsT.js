import React from "react";
import { CssBaseline, Box, Container, Paper, Typography } from "@mui/material";

import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import SportsScoreOutlinedIcon from "@mui/icons-material/SportsScoreOutlined";
import PaletteIcon from "@mui/icons-material/Palette";
import { pink } from "@mui/material/colors"; 
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

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
        <LocalShippingIcon color="success" sx={{ fontSize: 28 }} />
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
          A paleta de cores conecta diretamente o caminhoneiro saindo da Origem
          e seu Destino.
        </Typography>
      </Popover>
    </span>
  );
}

function TooltipInfo() {
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
        <InfoIcon sx={{ fontSize: 28 }} />
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
          <strong>ATENÇÃO - </strong> se o ícone do caminhoneiro não estiver a
          mesma cor do Destino, significa que ele está aguardando a carga no
          local.
        </Typography>
      </Popover>
    </span>
  );
}

export default function MapsT(props) {
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
            <TooltipInfo />
          </Typography>
          <Box sx={{ bgcolor: "#cfe8fc", width: "350", height: "400" }}>
            <iframe
              title="Google Maps do transportador"
              src="https://www.google.com/maps/d/embed?mid=1HEwIXYYZiy_DIr2NmPVor3E058BYWE4&ehbc=2E312F&ll=-15.28428314609778%2C-66.75607381218147&z=3"
              width="100%"
              height="400"
            ></iframe>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
/**
  
 Mundi:
 https://www.google.com/maps/d/u/0/embed?mid=1HEwIXYYZiy_DIr2NmPVor3E058BYWE4&ehbc=2E312F

 Brasil: 
 https://www.google.com/maps/d/embed?mid=1HEwIXYYZiy_DIr2NmPVor3E058BYWE4&ehbc=2E312F&ll=-15.28428314609778%2C-66.75607381218147&z=3

 Juiz de Fora:
 https://www.google.com/maps/d/u/0/embed?mid=1HEwIXYYZiy_DIr2NmPVor3E058BYWE4&ehbc=2E312F&ll=-21.757044853210292%2C-43.35096350639521&z=15

 adicionar as coordenadas: parque halfeld JF
 &ll=-21.757044853210292%2C-43.35096350639521&z=15
 */
