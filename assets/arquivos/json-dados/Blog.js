import * as React from "react";
import { useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, pink, grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import MapsC from "./MapsC";
import MapsT from "./MapsT";
import MapsW from "./MapsW";
import AnunciantesForm from "./Checkout";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import SecundFeaturedPost from "./SecundFeaturedPost";
import ThirthFeaturedPost from "./ThirthFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Footer from "./Footer";

import Button from "@mui/material/Button";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import anuncio1 from "./../assets/anunciantes/objetos-1.webp";
import anuncio2 from "./../assets/anunciantes/objetos-2.webp";
import anuncio3 from "./../assets/anunciantes/objetos-3.webp";
import anuncio4 from "./../assets/anunciantes/objetos-4.webp";
import anuncio5 from "./../assets/anunciantes/objetos-5.webp";
import anuncio6 from "./../assets/anunciantes/objetos-6.webp";
import transporte1 from "./../assets/transportadores/caminhao-1.jpg";
import transporte2 from "./../assets/transportadores/caminhao-2.jpg";
import transporte3 from "./../assets/transportadores/caminhao-3.jpg";
import transporte4 from "./../assets/transportadores/caminhao-medio-1.jpg";
import transporte5 from "./../assets/transportadores/frete-pequeno-1.webp";
import transporte6 from "./../assets/transportadores/frete-pequeno-2.webp";
import transporte7 from "./../assets/transportadores/frete-pequeno-3.webp";
import transporte8 from "./../assets/transportadores/frete-pequeno-4.jpeg";
import transporte9 from "./../assets/transportadores/frete-pequeno-5.webp";
import paine1 from "./../assets/painel/carreta-1.png";
import paine2 from "./../assets/painel/carreta-2.png";
import paine3 from "./../assets/painel/carreta-3.jpg";
import depositions1 from "./../assets/depositions/depositions-1.jpg";
import depositions2 from "./../assets/depositions/depositions-2.jpg";
import depositions3 from "./../assets/depositions/depositions-3.jpg";
import depositions4 from "./../assets/depositions/depositions-4.jpg";

import "./form.css";

const themeCard = createTheme({
  palette: {
    whatsapp: {
      tealgreen: "#128C7E",
      tealgreendark: "#075E54",
      lightgreen: "#25D366",
    },
    tomato: "#FF6347",
    pink: {
      deep: "#FF1493",
      hot: "#FF69B4",
      medium: "#C71585",
      pale: "#DB7093",
      light: "#FFB6C1",
    },
    grey: {
      deep: grey[200],
      hot: grey[800],
    },
    primary: {
      main: blue[200],
    },
    secondary: {
      main: pink[200],
    },
  },
});

const mainFeaturedPost = {
  title: "Transportar a um clique",
  description:
    "Conectando destinos, impulsionando negócios: SUA CARGA, NOSSA ROTA.",
  image: paine3,
  imageText: "transportar",
  linkText: "_",
};

const secundFeaturedPost = {
  title: "Sua carga, nosso compromisso!",
  description:
    "Conectamos você aos melhores transportadores do mercado, garantindo entregas rápidas e seguras.",
  image: paine2,
  imageText: "transportar",
  linkText: "_",
};

const thirthFeaturedPost = {
  title: "Sua carga em boas mãos!",
  description:
    "Nossa equipe está comprometida em oferecer soluções personalizadas e um atendimento de excelência.",
  image: paine1,
  imageText: "transportar",
  linkText: "_",
};

const featuredPosts = [
  {
    title: "Roberto de Castro",
    date: "08, Julho 2024",
    description:
      "Minha mudança tinha o peso de aproximadamente 20 quilos, eram pedras para decoração do meu jardim, encaixotadas em 12 volumes.",
    image: depositions1,
    imageLabel: "Embalagens",
    linkTo: " ",
  },
  {
    title: "Levere Transporte",
    date: "23, Julho 2024",
    description:
      "Peguei uma carga de Vitório ES para MG de duas mercearias que completou certinho os dois trechos que eu estaria viajando vazio.",
    image: depositions2,
    imageLabel: "Caminhões",
    linkTo: " ",
  },
  {
    title: "Maria Alice",
    date: "12, Junho 2024",
    description:
      "Gostaria de enviar minha decoração por uma transportadora porque eram objetos de valor sentimental e coleções.",
    image: depositions3,
    imageLabel: "Carregar sofá",
    linkTo: " ",
  },
  {
    title: "Potencial Transporte",
    date: "28, Junho 2024",
    description:
      "Completei o meu trajeto carregado por causa das três cargas que encaixaram no volume vazio que eu teria.",
    image: depositions4,
    imageLabel: "Caixa de encomenda",
    linkTo: " ",
  },
];

const anunciosProntos = [
  {
    nome: "Geladeira de bar",
    descricao: "Refrigerador Expositor Vertical All Black",
    volume: "3 metros (m³)",
    retirada: "Av. Paulista, 1520-1542 - Bela Vista - São Paulo - SP",
    entrega: "Entregar em: R. Rocha, 356-440 - Bela Vista - São Paulo - SP",
    idCodigo: "001A21032024",
  },
  {
    nome: "Bicama e colchão",
    descricao: "Bicama Completa C/ Auxiliar + 2 Colchões Probel D20",
    volume: "3 metros (m³) e os 2 colchões",
    retirada: "R. dos Tamóios - Centro, Belo Horizonte - MG, 30120-050",
    entrega:
      "Av. Prof. Alfredo Balena, 61-37 - Centro, Belo Horizonte - MG, 30130-100",
    idCodigo: "002A21032024",
  },
  {
    nome: "Geladeira frost free",
    descricao:
      "Geladeira Brastemp Frost Free Duplex 375 litros cor Inox com Espaço Adapt",
    volume: "3 metros (m³)",
    retirada: "Av. Paulista, 1520-1542 - Bela Vista - São Paulo - SP",
    entrega: "Entregar em: R. Rocha, 356-440 - Bela Vista - São Paulo - SP",
    idCodigo: "003A21032024",
  },
  {
    nome: "Sofá Retrátil e Reclinável",
    descricao: "Sofá Retrátil e Reclinável com Molas Ensacadas Cama inBox Gold",
    volume: "4 metros (m³)",
    retirada: "Av. Paulista, 1520-1542 - Bela Vista - São Paulo - SP",
    entrega: "Entregar em: R. Rocha, 356-440 - Bela Vista - São Paulo - SP",
    idCodigo: "004A21032024",
  },
  {
    nome: "Mesa de cozinha",
    descricao:
      "Conjunto Sala de Jantar Mesa Tampo de Vidro 6 Cadeiras Rustic/Crema/Imperial Alexis Madesa",
    volume: "5 caixas",
    retirada: "Av. Paulista, 1520-1542 - Bela Vista - São Paulo - SP",
    entrega: "Entregar em: R. Rocha, 356-440 - Bela Vista - São Paulo - SP",
    idCodigo: "005A21032024",
  },
  {
    nome: "Cadeiras de sala de aula",
    descricao:
      "Moob Cadeira de Escritório Presidente Chicago Giratória Com Sistema Relax",
    volume: "12 itens de 1 metro (m³)",
    retirada: "Av. Paulista, 1520-1542 - Bela Vista - São Paulo - SP",
    entrega: "Entregar em: R. Rocha, 356-440 - Bela Vista - São Paulo - SP",
    idCodigo: "006A21032024",
  },
];

const transportesProntos = [
  {
    nome: "Cavok Transportes / Caminhão semi-pesado",
    descricao: "VOLVO/VM 270 com 14 metros - 6 toneladas",
    volume: "30 metros (m³)",
    origem: "Av. Pres. Vargas, 1917 - Centro, Rio de Janeiro - RJ, 20210-030",
    atuacao: "120km",
    idCodigo: "007T21032024",
  },
  {
    nome: "CP Transportes / Caminhão truck",
    descricao: "VW/MAN/17.190 com 14 metros - 23 toneladas",
    volume: "50 metros (m³)",
    origem: "Av. Heitor Beltrão, 25 - Tijuca, Rio de Janeiro - RJ, 20520-051",
    atuacao: "80km",
    idCodigo: "008T21032024",
  },
  {
    nome: "Ligeirinho frete / Caminhão médio",
    descricao: "M. BENZ/1418 Truck",
    volume: "20 metros (m³)",
    origem:
      "R. Voluntários da Pátria, 45 - Botafogo, Rio de Janeiro - RJ, 22270-000",
    atuacao: "30km",
    idCodigo: "009T21032024",
  },
  {
    nome: "Rapidão / Caminhão pequeno",
    descricao: "M. BENZ/ACCELO 1316",
    volume: "12 metros (m³)",
    origem: "R. Silva Castro, 16 - Copacabana, Rio de Janeiro - RJ, 22031-030",
    atuacao: "25km",
    idCodigo: "012T21032024",
  },
  {
    nome: "DC Fretes / fretes pequenos",
    descricao: "D20",
    volume: "7 metros (m³)",
    origem: "Av. Paulista, 1520-1542 - Bela Vista - São Paulo - SP",
    atuacao: "40km",
    idCodigo: "014T21032024",
  },
  {
    nome: "Gabardo / fretes pequenos",
    descricao: "MASTER FURGÃO renault",
    volume: "10 metros (m³)",
    origem: "R. Dr. Laureano, 104 - Passos, Juiz de Fora - MG, 36026-400",
    atuacao: "80km",
    idCodigo: "015T21032024",
  },
  {
    nome: "Veloster / fretes pequenos",
    descricao: "Saveiro com carretinha",
    volume: "8 metros (m³)",
    origem:
      "R. Ver. Gercino Silva, 209-83 - Canto, Florianópolis - SC, 88075-560",
    atuacao: "80km",
    idCodigo: "016T21032024",
  },
  {
    nome: "Caminhonetão / fretes pequenos",
    descricao: "Montana",
    volume: "7 metros (m³)",
    origem: "Av. Paulista, 1520-1542 - Bela Vista - São Paulo - SP",
    atuacao: "70km",
    idCodigo: "013T21032024",
  },
  {
    nome: "Personnalite transportes / fretes pequenos",
    descricao: "Saveiro",
    volume: "4 metros (m³)",
    origem: "R. Afonso Pena, 479-301 - Canto, Florianópolis - SC, 88070-650",
    atuacao: "50km",
    idCodigo: "010T21032024",
  },
];

const pages = ["TRANSPORTE COM A GENTE"];

const defaultTheme = createTheme();

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function ContatoWhatsapp() {
  return (
    <ThemeProvider theme={themeCard}>
      <Button
        variant="contained"
        startIcon={<WhatsAppIcon />}
        href="https://api.whatsapp.com/send?phone=5532998615190&text=Olá Volta Express. Quero saber dos seus serviços."
        target="_blank"
        sx={{
          mx: 1,
          px: 0.5,
          bgcolor: "whatsapp.lightgreen",
          "&:hover": {
            backgroundColor: "whatsapp.tealgreen",
          },
        }}
      ></Button>
    </ThemeProvider>
  );
}

function MediaCardAnunc(props) {
  const [order] = React.useState(props.orderCard);
  const [imagem] = React.useState(props.anuncioImagem);

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 121 }}
        image={imagem}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {anunciosProntos[order].descricao}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Volume dos itens: {anunciosProntos[order].volume}
          </Typography>
          <Typography>Retirar em: {anunciosProntos[order].retirada}</Typography>
          <Typography>Entregar em: {anunciosProntos[order].entrega}</Typography>
          <Typography>
            IDA: {anunciosProntos[order].idCodigo}
            <ContatoWhatsapp />
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

function CustomizedAccordionsAnunc() {
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{anunciosProntos[0].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardAnunc orderCard={0} anuncioImagem={anuncio1} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>{anunciosProntos[1].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardAnunc orderCard={1} anuncioImagem={anuncio2} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>{anunciosProntos[2].nome} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardAnunc orderCard={2} anuncioImagem={anuncio3} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>{anunciosProntos[3].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardAnunc orderCard={3} anuncioImagem={anuncio4} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>{anunciosProntos[4].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardAnunc orderCard={4} anuncioImagem={anuncio5} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>{anunciosProntos[5].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardAnunc orderCard={5} anuncioImagem={anuncio6} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function MediaCardTransp(props) {
  const [order] = React.useState(props.orderCard);
  const [imagem] = React.useState(props.transporteImagem);

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 121 }}
        image={imagem}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {transportesProntos[order].descricao}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Volume livre: {transportesProntos[order].volume}
          </Typography>
          <Typography>Origem: {transportesProntos[order].origem}</Typography>
          <Typography>
            Atuação em: {transportesProntos[order].atuacao}
          </Typography>
          <Typography>
            IDA:{transportesProntos[order].idCodigo}
            <ContatoWhatsapp />
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

function CustomizedAccordionsTransp() {
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{transportesProntos[0].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardTransp orderCard={0} transporteImagem={transporte1} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>{transportesProntos[1].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardTransp orderCard={1} transporteImagem={transporte2} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>{transportesProntos[2].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardTransp orderCard={2} transporteImagem={transporte3} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>{transportesProntos[3].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardTransp orderCard={3} transporteImagem={transporte4} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>{transportesProntos[4].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardTransp orderCard={4} transporteImagem={transporte5} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>{transportesProntos[5].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardTransp orderCard={5} transporteImagem={transporte6} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>{transportesProntos[6].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardTransp orderCard={6} transporteImagem={transporte7} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography>{transportesProntos[7].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardTransp orderCard={7} transporteImagem={transporte8} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <Typography>{transportesProntos[8].nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MediaCardTransp orderCard={8} transporteImagem={transporte9} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box id="volta-express-transporte-com-a-gente" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="TRANSPORTE COM A GENTE" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AnunciantesForm funcionalidade="Transporte com a gente" />
      </CustomTabPanel>
    </Box>
  );
}

function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", mt: 18 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="COMO USAR O VOLTA EXPRESS" {...a11yProps(0)} />
          <Tab label="MAPA DE CARGAS" {...a11yProps(1)} />
          <Tab label="MAPA DE MOTORISTAS" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MapsW funcionalidade="Como usar o VOLTA EXPRESS" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MapsC funcionalidade="Mapa de cargas" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <MapsT funcionalidade="Mapa de transporte" />
      </CustomTabPanel>
    </Box>
  );
}

function DepoTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box id="volta-express-transporte-com-a-gente" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="DEPOIMENTOS" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))}
        </Grid>
      </CustomTabPanel>
    </Box>
  );
}

function AnuncTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box id="volta-express-transporte-com-a-gente" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="ANUNCIANTES" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid container>
          <CustomizedAccordionsAnunc />
        </Grid>
      </CustomTabPanel>
    </Box>
  );
}

function TranspTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box id="volta-express-transporte-com-a-gente" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="PARCEIROS TRANSPORTADORES" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid>
          <CustomizedAccordionsTransp />
        </Grid>
      </CustomTabPanel>
    </Box>
  );
}

function AccordionFAQ() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Preciso instalar o aplicativo para usar o Volta Express?
        </AccordionSummary>
        <AccordionDetails>
          <strong>NÃO.</strong> O{" "}
          <a
            href="https://volta-express.netlify.app/"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            portal Volta Express
          </a>{" "}
          é um sistema web. Assim, para usar nossas funcionalidades é fácil.
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Consigo usar o Volta Express gratuitamente?
        </AccordionSummary>
        <AccordionDetails>
          <strong>SIM.</strong> O Volta Express tem uma versão standard para
          permitir você usar e já ter bons resultados.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Como funciona a plataforma da Volta Express?
        </AccordionSummary>
        <AccordionDetails>
          <p>
            A Volta Express conecta motoristas autônomos a empresas que precisam
            transportar cargas.{" "}
          </p>
          <p>
            Através de nossa plataforma, você encontra as melhores oportunidades
            de frete, otimiza suas rotas e aumenta seus ganhos.
          </p>
          <p>
            Basta se cadastrar, informar seus dados e disponibilidade, e nossa
            tecnologia fará o restante, indicando as cargas mais adequadas para
            você.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          Quais os benefícios de utilizar a Volta Express?
        </AccordionSummary>
        <AccordionDetails>
          <p>
            A Volta Express oferece diversos benefícios para os motoristas. As
            duas maiores são:{" "}
          </p>
          <p>
            <strong>Mais cargas:</strong> Acesso a uma grande variedade de
            cargas, garantindo que seu caminhão esteja sempre trabalhando.
          </p>
          <p>
            <strong>Rotas otimizadas:</strong> Nossas ferramentas de
            roteirização ajudam você a encontrar a rota mais eficiente,
            economizando combustível e tempo.
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function FaqTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box id="volta-express-transporte-com-a-gente" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="FAQ" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid>
          <AccordionFAQ />
        </Grid>
      </CustomTabPanel>
    </Box>
  );
}

function AccordionFEEDBACK() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Mensagem:", mensagem);
    // Aqui você implementaria a lógica para enviar os dados, por exemplo, para uma API
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Qual o seu melhor contato (telefone/e-mail)?:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        O que quer falar com a gente?
        <textarea
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          rows="8"
        />
      </label>
      <br />
      <button className="msgEnviar" type="submit">ENVIAR MENSAGEM</button>
    </form>
  );
}

function FeedbackTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box id="volta-express-transporte-com-a-gente" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="FEEDBACK" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid>
          <AccordionFEEDBACK />
        </Grid>
      </CustomTabPanel>
    </Box>
  );
}

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header pages={pages} title="Volta Express" />
      <Container maxWidth="lg">
        <main>
          <Grid spacing={4} sx={{ t: 2, mt: 4 }}>
            <CenteredTabs />
          </Grid>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid spacing={4} sx={{ t: 2, mt: 4 }}>
            <BasicTabs />
          </Grid>
          <Grid spacing={4} sx={{ t: 2, mt: 4 }}>
            <DepoTabs />
          </Grid>
          <Grid spacing={4} sx={{ t: 2, mt: 4 }}>
            <AnuncTabs />
          </Grid>
          <Grid spacing={4} sx={{ t: 2, mt: 4 }}>
            <TranspTabs />
          </Grid>
          <SecundFeaturedPost post={secundFeaturedPost} />
          <Grid spacing={4} sx={{ t: 2, mt: 4 }}>
            <FaqTabs />
          </Grid>
          <Grid spacing={4} sx={{ t: 2, mt: 4 }}>
            <FeedbackTabs />
          </Grid>
          <ThirthFeaturedPost post={thirthFeaturedPost} />
        </main>
      </Container>
      <Footer
        title="Volta Express"
        description="Transportar a um clique | Conectando destinos, impulsionando negócios: SUA CARGA, NOSSA ROTA."
      />
    </ThemeProvider>
  );
}
