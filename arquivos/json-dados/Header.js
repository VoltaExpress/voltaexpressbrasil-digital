import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CardMedia from "@mui/material/CardMedia";

import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

import logoVoltaExpress from "./../assets/icon-logo/logo-completa.png";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function LogoVoltaExpress() {
  return (
    <CardMedia
      component="img"
      sx={{ width: 112 }}
      image={logoVoltaExpress}
      alt="Volta Express"
    />
  );
}

function Header(props) {
  const { pages } = props;

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="#volta-express-transportar-a-um-clique">
            <LogoVoltaExpress
              noWrap
              component="a"
              sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
            />
          </a>
          {/* START - MOBILE */}
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "flex",
                md: "none",
              },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: "block",
                my: 0,
                mr: 0,
                ml: 0,
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 0,
                    display: "block",
                    mr: 0,
                    ml: 0,
                  }}
                >
                  {/*<Typography textAlign="center">{page}</Typography> */}
                  <ColorButton
                    href="#volta-express-transporte-com-a-gente"
                    variant="contained"
                    size="medium"
                    //key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      mb: 0.4,
                      color: "white",
                      display: "block",
                      mr: 0,
                      ml: 0,
                    }}
                  >
                    TRANSPORTE COM A GENTE
                  </ColorButton>
                  <ColorButton
                    href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAANvDZpUQlIyN0lFSDgyNzE0NFJBQzFJSDJYUUREUC4u"
                    variant="contained"
                    size="medium"
                    //key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 0,
                      color: "white",
                      display: "block",
                      mr: 0,
                      ml: 0,
                    }}
                  >
                    VENHA PARA O VOLTA EXPRESS 
                  </ColorButton>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* THE END - MOBILE */}

          {/* START - DESKTOP */}
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
              },
              justifyContent: "space-between",
            }}
          >
            {/*{pages.map((page) => (
              <ColorButton
                href="#volta-express-transporte-com-a-gente"
                variant="contained"
                size="medium"
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block", mr: 1, ml: 2 }}
              >
                {page}
              </ColorButton>
            ))}*/}
            <ColorButton
              href="#volta-express-transporte-com-a-gente"
              variant="contained"
              size="medium"
              //key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block", mr: 1, ml: 2 }}
            >
              TRANSPORTE COM A GENTE
            </ColorButton>
            <ColorButton
              href="https://forms.office.com/Pages/ResponsePage.aspx?id=fXmzFxZ8hUWOMIqY0e7Ew1G6kYgJnl9Bovy9UF80z8FUNDBSSzcxMlg5UjgzM01YR1MzSExHMFRQWi4u"
              target="_blank"
              variant="contained"
              size="medium"
              //key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block", mr: 1, ml: 2 }}
            >
              VENHA PARA O VOLTA EXPRESS 
            </ColorButton>
          </Box>
          {/* THE END - DESKTOP */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Header.propTypes = {
  pages: PropTypes.string.isRequired,
  settings: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
