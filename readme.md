# 🚚 Volta Express Brasil — Brand, Media & Digital Assets Hub

> **Repositório Central de Ativos Digitais, Design System Media, Insumos de Campanhas e Documentação de Produto.**

Este repositório atua como a **Single Source of Truth (SSOT)** para todos os recursos visuais, mídias de marketing, identidades das personas e ativos digitais do ecossistema **Volta Express Brasil**. 

Ao isolar os elementos de mídia e documentação neste repositório, garantimos que os repositórios das aplicações (`voltaexpress` e `voltaexpressbrasil`) permaneçam leves, focados estritamente em código e com alta performance de build.

---

## 🏛️ Estrutura do Repositório

O repositório é organizado de forma modular com base nas personas da plataforma, jornadas de produto e iniciativas de comunicação/marketing:

```text
voltaexpressbrasil-digital/
├── arquivos/                           # Documentos institucionais e insumos de dev
│   ├── banco-dados/                    # Mapeamentos e esquemas relacionais
│   ├── forms/                          # Estruturas de formulários e pesquisas
│   ├── json-dados/                     # Mocks e dados estáticos de validação
│   ├── pitch/                          # Apresentações para investidores e parceiros
│   └── qa-infos/                       # Mapeamentos e referências para testes
├── midias/                             # Mídias ricas e materiais em vídeo
│   └── videos/                         # Teasers, demos da plataforma e releases
├── quero-carregar-transportador/       # Assets da Persona 1: Caminhoneiros / Transportadores
│   ├── anunciar-caminhao/              # Elementos visuais do fluxo de oferta de frete
│   ├── buscar-carga/                   # Elementos visuais de busca de fretes
│   ├── persona/                        # Mapeamento do perfil e dores do motorista
│   └── public/                         # Artes e vantagems em imagem (.png)
├── quero-transportar-embarcador/       # Assets da Persona 2: Empresas / Embarcadores
│   ├── anunciar-carga/                 # Elementos visuais do fluxo de cadastro de carga
│   ├── buscar-caminhao/                # Elementos visuais de busca de veículos
│   ├── persona/                        # Mapeamento do perfil e dores do contratante
│   └── public/                         # Artes e vantagens em imagem (.png)
└── voltaexpressbrasil/                 # Identity, Branding & Marketing Visual
    ├── assets/                         # Ícones e elementos gráficos auxiliares
    ├── veb-logo/                       # Logotipos oficiais (PNG, SVG, variações)
    ├── veb-mkt-1/                      # Peças visuais da Campanha MKT 01 (WhatsApp / Redes)
    ├── veb-mkt-2/                      # Peças visuais da Campanha MKT 02
    ├── veb-mkt-3/                      # Peças visuais da Campanha MKT 03
    └── veb-painel/                     # Screenshots e conceitos visuais do Dashboard
```

## 🎯 Padrões de Uso e Governança

### 1. Padronização de Nomenclatura de Arquivos
Para evitar quebras de URL e garantir compatibilidade cross-platform (web/mobile/CDNs), siga os padrões:
* Utilize **kebab-case** em letras minúsculas: `logo-volta-express-fundo-amarelo.png` em vez de `Logo - Volta Express (1).png`.
* Evite acentos, espaços, parênteses e caracteres especiais nos nomes de arquivos.

### 2. Versionamento e Uploads de Mídia
* **Imagens:** Utilize formatos otimizados (`.webp` ou `.png` compactado) para manter o repositório performático.
* **Vídeos Ricos (>50MB):** Certifique-se de utilizar o **Git LFS** (*Large File Storage*) ao subir arquivos `.mp4` extensos.

---

## 🚀 Como Consumir esses Assets na Aplicação Web

Você pode referenciar as imagens diretamente no frontend ou na documentação utilizando o link bruto (*Raw*) do GitHub:

```html
<!-- Exemplo de consumo da Logo Oficial -->
<img 
  src="[https://raw.githubusercontent.com/VoltaExpress/voltaexpressbrasil-digital/main/voltaexpressbrasil/veb-logo/logo-principal.png](https://raw.githubusercontent.com/VoltaExpress/voltaexpressbrasil-digital/main/voltaexpressbrasil/veb-logo/logo-principal.png)" 
  alt="Volta Express Brasil"
/>
```


## 🛡️ Contribuição e Licença

Este repositório é gerenciado internamente pela equipe da **Volta Express Brasil**. Alterações em logotipos, identidades visuais de campanhas e documentos de produto devem ser aprovadas pela liderança de produto (PM/CTO).

* **Organização no GitHub:** [github.com/VoltaExpress](https://github.com/VoltaExpress)
* **Domínio Oficial:** [voltaexpressbrasil.com.br](https://voltaexpressbrasil.com.br)
* **Repositório de Documentação:** [voltaexpressbrasil-digital](https://github.com/VoltaExpress/voltaexpressbrasil-digital)
