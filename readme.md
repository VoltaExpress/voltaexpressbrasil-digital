# 🚚 Volta Express Brasil — Brand, Media & Digital Assets Hub

<p align="center">
  <img src="https://img.shields.io/badge/Version-v6.0_Digital-0052CC?style=for-the-badge&logo=github" alt="Version 6.0">
  <img src="https://img.shields.io/badge/Architecture-ES6_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="ES6 Modules">
  <img src="https://img.shields.io/badge/UI_Framework-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/BU-Log%C3%ADstica_&_Transporte-FF6C37?style=for-the-badge&logo=postman" alt="BU Logística">
  <img src="https://img.shields.io/badge/Status-Production_Ready-2ea44f?style=for-the-badge" alt="Status">
</p>

> **Single Source of Truth (SSOT)** para ativos de mídia, design system, mídias de campanhas, provas sociais de personas e documentação técnica e de produto do ecossistema **Volta Express Brasil**.

---

## 💡 Sobre o Hub Digital

Este repositório atua como o **Portal do Conhecimento e Central de Ativos** da plataforma **Volta Express Brasil**. 

Além de armazenar e organizar todos os insumos visuais e documentais, o projeto conta com uma **aplicação web interativa (Dashboard PWA-ready)** construída com arquitetura limpa em **JavaScript Modular (ES6)**. Essa interface permite que desenvolvedores, gestores de produto e designers naveguem, inspecionem e consumam **250 ativos de negócio catalogados em 38 diretórios**, oferecendo suporte ao vivo para visualização de **PDFs, planilhas Excel, vídeos MP4, imagens e código-fonte**.

Ao centralizar esses ativos neste repositório, garantimos que as aplicações core do ecossistema (`voltaexpress` e `voltaexpressbrasil`) permaneçam leves, focadas em código operacional e com máxima performance nos builds de produção.

---

## 🖥️ A Aplicação Web (Digital Hub Dashboard)

O repositório disponibiliza um **Dashboard Interativo** acessível via GitHub Pages, construído com uma arquitetura desacoplada e orientada a componentes puramente nativos (sem overhead de build):

* 🔍 **Busca Inteligente por Ativos:** Filtro em tempo real por nome de arquivo, tipo ou insight de produto.
* 📊 **Renderizador Multi-formato NATIVO:**
  * **Planilhas (`.xlsx`):** Leitura e renderização nativa de tabelas de dados via `SheetJS`.
  * **Documentos e Pitch Decks (`.pdf`):** Visualização embutida de alta fidelidade.
  * **Código & Mockups (`.js`, `.css`, `.json`):** Syntax Highlighting automático via `Prism.js`.
  * **Vídeos Ricos (`.mp4`):** Player nativo para releases, teasers e gravações de QA.
  * **Artes & Mídias (`.png`, `.jpg`, `.webp`):** Galeria e renderizador de fotos e assets.
* 💡 **Camada de Product Insights:** Cada arquivo possui um resumo executivo contextualizando seu valor para a regra de negócio da plataforma.

---

## 🏛️ Estrutura Arquitetural do Repositório

O projeto é dividido em **dois pilares fundamentais**: a **Camada de Aplicação (`js/`)** e o **Contêiner de Ativos (`assets/`)**.

```text
voltaexpressbrasil-digital/
├── index.html                    # Ponto de entrada HTML do Dashboard Hub
├── style.css                     # Estilos visuais, variáveis de tema e overrides
├── readme.md                     # Documentação mestre de governança
│
├── js/                           # 🧠 CAMADA DE APLICAÇÃO (ES6 Modules)
│   ├── config.js                 # Constantes globais, caminhos base e ícones por extensão
│   ├── data.js                   # [DATA] Matriz de dados dos 250 ativos e catálogo de insights
│   ├── renderers.js              # [VIEWER] Motores de renderização (PDF, Excel, Video, Code, Img)
│   ├── ui.js                     # [CONTROLLER] Lógica da árvore interativa, busca e estados da UI
│   └── main.js                   # [BOOTSTRAP] Ponto de entrada de inicialização
│
└── assets/                       # 📦 CONTÊINER OFICIAL DE ATIVOS (250 Arquivos / 38 Pastas)
    ├── arquivos/                 # Documentos institucionais, cadastros e insumos de dev
    │   ├── banco-dados/          # Documentação OpenAPI/Swagger e schemas relacionais
    │   ├── forms/                # Respostas de formulários (.xlsx) de embarcadores e motoristas
    │   ├── json-dados/           # Componentes e mocks estáticos de validação
    │   ├── live/                 # Registros de reuniões e alinhamentos
    │   ├── parceiros/            # Atas e acordos comerciais com parceiros
    │   ├── pitch/                # Apresentações oficiais de Pitch Deck para investidores
    │   ├── prototipo/            # Prompts e especificações de prototipagem (Lovable/Figma)
    │   ├── qa-infos/             # Screenshots, legendas de mapa e evidências de testes de UI
    │   ├── qa-refs/              # Tabelas de tamanhos de caminhões e referências visuais
    │   ├── qa-v5/                # Fluxos funcionais e matrizes da versão 5
    │   ├── supabase/             # Prints de configuração de banco, Auth e RLS no Supabase
    │   └── vaga-dev/             # Desafios técnicos e requisitos para contratação de devs
    │
    ├── inspiracoes/              # Referências visuais e banco de ideias
    │   ├── arts/                 # UI/UX de plataformas de transporte e fotos de veículos
    │   └── mkt-campanhas/        # Artes para campanhas de frete residencial e comercial
    │
    ├── midias/                   # Arquivos de vídeo e mídia rica
    │   └── videos/               # Releases oficiais, demos de navegação e testes de campo
    │
    ├── quero-carregar-transportador/ # Persona 1: Caminhoneiro / Motorista Autônomo
    │   ├── anunciar-caminhao/    # Screenshots e fotos do fluxo de oferta de frota
    │   ├── buscar-carga/         # Visual da vitrine e lista de cargas disponíveis
    │   ├── persona/              # Fotos, avatares e depoimentos da persona Motorista
    │   ├── public/               # Favicons e manifestos PWA do módulo
    │   └── vantagem/             # Cards visuais das vantagens para o caminhoneiro
    │
    ├── quero-transportar-embarcador/ # Persona 2: Embarcador / Empresa / Contratante
    │   ├── anunciar-carga/       # Visual do cadastro de frete e categorias de cargas
    │   ├── buscar-caminhao/      # Visual da vitrine de frotas e caminhões disponíveis
    │   ├── persona/              # Avatares e perfis da persona Embarcador
    │   ├── public/               # Favicons e manifestos PWA do módulo
    │   └── vantagem/             # Cards visuais das vantagens para o embarcador
    │
    └── voltaexpressbrasil/       # Branding, Identidade Visual & Campanhas
        ├── assets/               # Logotipos e marcas auxiliares do ecossistema
        ├── public/               # Manifestos e favicons institucionais
        ├── veb-logo/             # Assinaturas e logos em alta resolução (PNG, ICO, SVG)
        ├── veb-mkt-1/            # Peças da Campanha MKT 01 (WhatsApp e redes sociais)
        ├── veb-mkt-2/            # Peças da Campanha MKT 02 e diagrama de fluxo
        ├── veb-mkt-3/            # Galeria conceitual de frotas, rodovias e rotas
        └── veb-painel/           # Imagens conceituais para composição do painel
```

---

## 🎯 Padrões de Uso e Governança

### 1. Padronização de Nomenclatura de Arquivos
Para evitar quebras de URL no GitHub Pages e garantir compatibilidade cross-platform (Web / PWA / Android / iOS / CDNs):
* **Sempre utilize `kebab-case`** em letras minúsculas para novos arquivos:  
  `logo-volta-express-fundo-amarelo.png` em vez de `Logo - Volta Express (1).png`.
* Evite acentos, espaços, parênteses e caracteres especiais na criação de pastas e arquivos.

### 2. Adição de Novos Ativos ao Hub
Sempre que novos ativos forem adicionados ao diretório `assets/`, a matriz de dados do Dashboard deve ser atualizada para manter o índice 100% sincronizado:
1. Adicione os arquivos físicos dentro da subpasta apropriada em `assets/`.
2. Registre os novos nós no arquivo `js/data.js` especificando: `name`, `type`, `ext`, `path` e o `insight` executivo do ativo.

### 3. Versionamento de Mídias Grandes
* Para arquivos de imagem, prefira os formatos `.webp` ou `.png` otimizados.
* Vídeos demonstrativos (`.mp4`) com tamanho superior a 50MB devem utilizar o **Git LFS** (*Large File Storage*).

---

## 🌿 Workflow de Branches e Deploy

Adotamos um fluxo rigoroso de ramos no Git para proteção do ambiente de produção:

* **`main`**: Branch de produção e ambiente live do GitHub Pages. Contém apenas o código homologado e os ativos finais aprovados.
* **`developer-mvp`**: Branch de desenvolvimento do MVP. Centraliza arquivos de trabalho, mídias de testes e validações antes da fusão.
* **`features/versao-docs`**: Branch dedicada a melhorias estruturais, refatoração de código, atualização do Dashboard e governança do `README.md`.

---

## 📋 Backlog de Evolução Técnica

- [x] **Arquitetura Modular ES6:** Refatoração do script monolítico para a estrutura limpa em `js/` (`config`, `data`, `renderers`, `ui`, `main`).
- [x] **Mapeamento do Repositório:** Catalogação visual e indexação de 100% dos 250 ativos de negócio em 38 diretórios.
- [ ] **Padronização de Nomenclatura:** Refatorar nomes de arquivos legados que contenham espaços ou parênteses para `kebab-case`.
- [ ] **Otimização de Mídias:** Compactar imagens pesadas em `assets/` convertendo para `.webp`.
- [ ] **Integração de Raw CDN Linker:** Adicionar na UI do Dashboard um botão de "Copiar URL Raw" para facilitar o uso dos ativos pelos devs no frontend.

---

## 🚀 Como Consumir os Ativos na Aplicação Web

Os desenvolvedores podem referenciar qualquer imagem, logo ou documento diretamente no frontend das aplicações utilizando a CDN Raw do GitHub:

```html
<!-- Exemplo de consumo do Logotipo Oficial -->
<img 
  src="[https://raw.githubusercontent.com/VoltaExpress/voltaexpressbrasil-digital/main/assets/voltaexpressbrasil/veb-logo/logo-completa.png](https://raw.githubusercontent.com/VoltaExpress/voltaexpressbrasil-digital/main/assets/voltaexpressbrasil/veb-logo/logo-completa.png)" 
  alt="Volta Express Brasil Logo"
/>

<!-- Exemplo de consumo da Persona Caminhoneiro -->
<img 
  src="[https://raw.githubusercontent.com/VoltaExpress/voltaexpressbrasil-digital/main/assets/quero-carregar-transportador/persona/caminhoneiro-1.png](https://raw.githubusercontent.com/VoltaExpress/voltaexpressbrasil-digital/main/assets/quero-carregar-transportador/persona/caminhoneiro-1.png)" 
  alt="Persona Caminhoneiro Volta Express"
/>
```

---

## 🛡️ Contribuição e Licença

Este repositório é gerenciado internamente pela equipe de Produto e Engenharia da **Volta Express Brasil**. Alterações na estrutura de dados, diretórios de marca ou inclusão de novos materiais devem passar por aprovação da liderança técnica (PM / CTO).

* **Organização no GitHub:** [github.com/VoltaExpress](https://github.com/VoltaExpress)
* **Domínio Oficial:** [voltaexpressbrasil.com.br](https://voltaexpressbrasil.com.br)
* **Repositório Digital Hub:** [voltaexpressbrasil-digital](https://github.com/VoltaExpress/voltaexpressbrasil-digital)