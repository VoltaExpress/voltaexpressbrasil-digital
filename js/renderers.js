import { escapeHtml } from "./config.js";

/**
 * Renderizador de arquivos no container principal
 */
export const Renderers = {
  renderPdf(file, container) {
    container.innerHTML = `<iframe src="${file.path}" class="w-full h-full min-h-[550px] rounded-xl border border-slate-200 shadow-sm"></iframe>`;
  },

  renderImage(file, container) {
    const title = file.label || file.name;
    container.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center p-4">
        <img src="${file.path}" alt="${title}" class="max-h-[500px] rounded-xl border border-slate-200 shadow-md object-contain bg-white p-2">
      </div>
    `;
  },

  renderVideo(file, container) {
    container.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center p-4">
        <video controls class="max-h-[480px] rounded-xl border border-slate-200 shadow-lg bg-black">
          <source src="${file.path}" type="video/mp4">
          Seu navegador não suporta a exibição deste vídeo.
        </video>
      </div>
    `;
  },

  renderCode(file, container) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-500 flex items-center justify-center gap-2">
        <i class="fa-solid fa-spinner fa-spin text-blue-600 text-lg"></i>
        <span>Lendo código fonte...</span>
      </div>
    `;

    const langMap = {
      js: "javascript",
      css: "css",
      json: "json",
      html: "html",
      ts: "typescript"
    };
    const language = langMap[file.ext] || "javascript";
    const fileTitle = file.label || file.name;

    fetch(file.path)
      .then(response => {
        if (!response.ok) throw new Error("Não foi possível carregar o arquivo de código.");
        return response.text();
      })
      .then(codeText => {
        const safeCode = codeText
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        container.innerHTML = `
          <div class="max-w-5xl mx-auto my-4 bg-slate-900 rounded-xl shadow-lg border border-slate-800 overflow-hidden flex flex-col">
            <div class="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                <span class="ml-2 text-xs font-mono text-slate-400">${fileTitle}</span>
              </div>
              <span class="text-[10px] font-mono text-blue-400 uppercase bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">${language}</span>
            </div>

            <div class="p-4 overflow-x-auto text-xs font-mono leading-relaxed">
              <pre class="!bg-transparent !m-0 !p-0"><code class="language-${language}">${safeCode}</code></pre>
            </div>
          </div>
        `;

        if (window.Prism) {
          window.Prism.highlightAllUnder(container);
        }
      })
      .catch(error => {
        container.innerHTML = `
          <div class="p-6 bg-red-50 text-red-700 rounded-lg border border-red-200 text-center max-w-lg mx-auto my-8">
            <i class="fa-solid fa-triangle-exclamation text-2xl mb-2 text-red-500"></i>
            <p class="font-semibold text-sm">Erro ao carregar o arquivo de código.</p>
            <p class="text-xs text-red-500 mt-1">${error.message}</p>
          </div>
        `;
      });
  },

  renderExcel(file, container) {
    const fileTitle = file.label || file.name;
    fetch(file.path)
      .then(res => res.arrayBuffer())
      .then(buffer => {
        if (window.XLSX) {
          const workbook = XLSX.read(buffer, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const htmlTable = XLSX.utils.sheet_to_html(firstSheet, { header: "", editable: false });
          container.innerHTML = `<div class="overflow-x-auto rounded-xl border border-slate-200 bg-white p-4">${htmlTable}</div>`;
          const table = container.querySelector("table");
          if (table) table.className = "excel-table";
        }
      })
      .catch(() => {
        container.innerHTML = `
          <div class="p-6 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
            <p class="font-bold text-slate-800 mb-1">${fileTitle}</p>
            <p>Caminho: ${file.path}</p>
            <p class="mt-2 text-slate-500">${file.insight}</p>
          </div>
        `;
      });
  },

  renderDefault(file, container) {
    const fileTitle = file.label || file.name;
    container.innerHTML = `
      <div class="p-6 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
        <p class="font-bold text-slate-800 text-sm">${fileTitle}</p>
        <p class="font-mono text-slate-400 text-[11px]">${file.path}</p>
        <div class="mt-4 p-3 bg-slate-50 rounded border border-slate-200">
          <p class="font-semibold text-slate-700 mb-1">Resumo Executivo:</p>
          <p>${file.insight}</p>
        </div>
      </div>
    `;
  },

  /**
   * Renderiza a Grid de Imagens e Mídias no container central
   */
  renderFolderGrid(folder, container) {
    if (folder.name === "benchmarking-produto") {
      this.renderBenchmarkingGrid(folder, container);
      return;
    }

    if (folder.name === "posicionamento-digital") {
      this.renderSocialGrid(folder, container);
      return;
    }

    if (folder.name === "pesquisa-cliente-forms") {
      this.renderFormsGrid(folder, container);
      return;
    }

    if (folder.name === "netlify") {
      this.renderNetlifyGrid(folder, container);
      return;
    }

    if (folder.name === "godaddy") {
      this.renderGoDaddyGrid(folder, container);
      return;
    }

    const targetArea = container || document.getElementById("viewerContainer") || document.getElementById("main-content");
    if (!targetArea) return;

    window.currentGridItems = folder.children || [];
    const folderTitle = folder.label || folder.name;

    targetArea.innerHTML = `
      <div class="mb-6 border-b border-slate-700/60 pb-4">
        <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <i class="fa-solid fa-folder-open text-blue-400"></i> ${folderTitle}
        </h2>
        <p class="text-xs text-slate-400 mt-1">
          Exibindo ${window.currentGridItems.length} evidências e registros visuais do catálogo
        </p>
      </div>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        ${window.currentGridItems.map((file, index) => {
      const itemTitle = file.label || file.name;
      return `
            <div 
              onclick="Renderers.openImageModal(${index})"
              class="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-700/80 cursor-pointer hover:border-indigo-500 transition-all duration-200 shadow-md hover:shadow-indigo-500/20"
            >
              <div class="aspect-square w-full overflow-hidden flex items-center justify-center bg-slate-950/60">
                <img 
                  src="${file.path}" 
                  alt="${itemTitle}" 
                  loading="lazy" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div class="p-2.5 bg-slate-900/90 border-t border-slate-800">
                <p class="text-xs font-medium text-slate-300 truncate" title="${itemTitle}">${itemTitle}</p>
              </div>
            </div>
          `;
    }).join('')}
      </div>
    `;
  },

  renderGoDaddyGrid(folder, container) {
    const targetArea = container || document.getElementById("viewerContainer") || document.getElementById("main-content");
    if (!targetArea) return;

    const items = folder.children || [];

    targetArea.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
        ${items.map(item => {
      const itemTitle = item.label || item.name;
      const isBuilder = item.category && item.category.includes("Builder");
      const icon = isBuilder ? "fa-cubes" : "fa-server";
      const iconColor = isBuilder ? "text-emerald-600" : "text-cyan-600";
      const badgeColor = isBuilder ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-cyan-50 text-cyan-700 border-cyan-200";

      return `
            <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl ${iconColor} group-hover:scale-110 transition duration-200">
                    <i class="fa-solid ${icon}"></i>
                  </div>
                  <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${badgeColor}">
                    ${item.category || 'GoDaddy'}
                  </span>
                </div>
                <h4 class="text-sm font-bold text-slate-800 mb-1.5">${itemTitle}</h4>
                <p class="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">${item.insight || ''}</p>
              </div>

              <a href="${item.url}" target="_blank" rel="noopener noreferrer" 
                 class="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-medium py-2.5 px-3 rounded-lg transition duration-150 shadow-sm">
                <span>Abrir na GoDaddy</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              </a>
            </div>
          `;
    }).join('')}
      </div>
    `;
  },

  renderNetlifyGrid(folder, container) {
    const targetArea = container || document.getElementById("viewerContainer") || document.getElementById("main-content");
    if (!targetArea) return;

    const items = folder.children || [];

    targetArea.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
        ${items.map(item => {
      const itemTitle = item.label || item.name;
      const isApp = item.category === "App / Painel";
      const icon = isApp ? "fa-server" : "fa-book-bookmark";
      const iconColor = isApp ? "text-teal-500" : "text-sky-500";
      const badgeColor = isApp ? "bg-teal-50 text-teal-700 border-teal-200" : "bg-sky-50 text-sky-700 border-sky-200";

      return `
            <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl ${iconColor} group-hover:scale-110 transition duration-200">
                    <i class="fa-solid ${icon}"></i>
                  </div>
                  <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${badgeColor}">
                    ${item.category || 'Netlify'}
                  </span>
                </div>
                <h4 class="text-sm font-bold text-slate-800 mb-1.5">${itemTitle}</h4>
                <p class="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">${item.insight || ''}</p>
              </div>

              <a href="${item.url}" target="_blank" rel="noopener noreferrer" 
                 class="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-medium py-2.5 px-3 rounded-lg transition duration-150 shadow-sm">
                <span>Abrir no Netlify</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              </a>
            </div>
          `;
    }).join('')}
      </div>
    `;
  },

  renderBenchmarkingGrid(folder, container) {
    const targetArea = container || document.getElementById("viewerContainer");
    if (!targetArea) return;

    const items = folder.children || [];

    targetArea.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
        ${items.map((item, index) => {
      const itemTitle = item.label || item.name;
      const isVideo = item.ext === "video";
      const icon = isVideo ? "fa-youtube text-red-600" : "fa-file-lines text-blue-600";
      const badgeColor = isVideo ? "bg-red-50 text-red-700 border-red-200" : "bg-blue-50 text-blue-700 border-blue-200";

      return `
            <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition duration-200">
                    <i class="fa-solid ${icon}"></i>
                  </div>
                  <span class="text-[10px] font-mono font-semibold px-2.5 py-1 rounded border ${badgeColor}">
                    ${item.category || 'Benchmarking'}
                  </span>
                </div>
                <h4 class="text-base font-bold text-slate-900 mb-2">${itemTitle}</h4>
                <p class="text-xs text-slate-600 leading-relaxed mb-6">${item.insight}</p>
              </div>

              <button onclick="window.uiController.openBenchmarkingItem(${index})"
                      class="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold py-3 px-4 rounded-lg transition duration-150 shadow-sm">
                <span>${isVideo ? "Assistir Vídeo Internamente" : "Visualizar Documentação Completa"}</span>
                <i class="fa-solid ${isVideo ? 'fa-play' : 'fa-arrow-right'} text-[10px]"></i>
              </button>
            </div>
          `;
    }).join('')}
      </div>
    `;
  },

  renderFormsGrid(folder, container) {
    const targetArea = container || document.getElementById("viewerContainer") || document.getElementById("main-content");
    if (!targetArea) return;

    const items = folder.children || [];

    targetArea.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
        ${items.map(item => {
      const itemTitle = item.label || item.name;
      let icon = "fa-wpforms";
      let iconColor = "text-teal-600";
      let badgeColor = "bg-teal-50 text-teal-700 border-teal-200";

      if (item.category === "Respostas") {
        icon = "fa-file-excel";
        iconColor = "text-emerald-600";
        badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
      } else if (item.category === "Edição") {
        icon = "fa-pen-to-square";
        iconColor = "text-amber-600";
        badgeColor = "bg-amber-50 text-amber-700 border-amber-200";
      }

      return `
            <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl ${iconColor} group-hover:scale-110 transition duration-200">
                    <i class="fa-solid ${icon}"></i>
                  </div>
                  <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${badgeColor}">
                    ${item.category || 'Forms'}
                  </span>
                </div>
                <h4 class="text-sm font-bold text-slate-800 mb-1.5">${itemTitle}</h4>
                <p class="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">${item.insight || ''}</p>
              </div>

              <a href="${item.url}" target="_blank" rel="noopener noreferrer" 
                 class="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-medium py-2.5 px-3 rounded-lg transition duration-150 shadow-sm">
                <span>Abrir Link Externo</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              </a>
            </div>
          `;
    }).join('')}
      </div>
    `;
  },

  renderSocialGrid(folder, container) {
    const targetArea = container || document.getElementById("viewerContainer") || document.getElementById("main-content");
    if (!targetArea) return;

    const items = folder.children || [];

    targetArea.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
        ${items.map(item => {
      const itemTitle = item.label || item.name;
      const isBrandIcon = !item.icon.includes('envelope') && !item.icon.includes('paper-plane');
      const iconPrefix = isBrandIcon ? 'fa-brands' : 'fa-solid';

      return `
            <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-lg bg-slate-100/80 flex items-center justify-center text-xl ${item.color || 'text-slate-700'} group-hover:scale-110 transition duration-200">
                    <i class="${iconPrefix} ${item.icon || 'fa-globe'}"></i>
                  </div>
                  <span class="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-semibold">
                    Canal Oficial
                  </span>
                </div>
                <h4 class="text-sm font-bold text-slate-800 mb-1.5">${itemTitle}</h4>
                <p class="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">${item.insight || ''}</p>
              </div>

              <a href="${item.url}" target="_blank" rel="noopener noreferrer" 
                 class="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-medium py-2.5 px-3 rounded-lg transition duration-150 shadow-sm">
                <span>Acessar Canal</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              </a>
            </div>
          `;
    }).join('')}
      </div>
    `;
  },

  renderBenchmarkingVideo(container) {
    container.innerHTML = `
      <div class="max-w-5xl mx-auto my-4 bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden flex flex-col">
        <div class="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <i class="fa-brands fa-youtube text-red-500 text-xl"></i>
            <span class="text-sm font-bold text-white">Análise de Referência do Ecossistema</span>
          </div>
          <span class="text-xs font-mono text-red-400 bg-red-950/60 px-2.5 py-1 rounded border border-red-800/40">Player Interno</span>
        </div>
        <div class="relative w-full aspect-video bg-black">
          <iframe src="https://www.youtube.com/embed/GiCqtnedveg?autoplay=1" 
                  title="Benchmarking Video" 
                  class="absolute top-0 left-0 w-full h-full border-0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
          </iframe>
        </div>
      </div>
    `;
  },

  renderBenchmarkingDoc(container) {
    const docUrl = "https://docs.google.com/document/d/1Ed-TkNVTAiny1Xiv3xlV9W00PTxt2zCB0k7mBfadyoc/edit?tab=t.0";

    container.innerHTML = `
      <div class="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 my-4 text-slate-800 font-sans leading-relaxed space-y-8">
        <div class="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-blue-100">
              <i class="fa-solid fa-lightbulb"></i> Benchmarking de Produto SaaS
            </div>
            <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Especificação de Requisitos: Plataforma de Auxílio ao Transporte</h2>
            <p class="text-xs text-slate-500 font-mono mt-2">Documentação Técnica & Modelo de Negócios</p>
          </div>

          <a href="${docUrl}" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 px-4 rounded-lg border border-slate-300 transition duration-150 shrink-0 self-start md:self-auto shadow-sm">
            <i class="fa-solid fa-file-word text-blue-600 text-sm"></i>
            <span>Abrir Doc Original</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-500"></i>
          </a>
        </div>

        <section class="space-y-3">
          <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-bullseye text-blue-600"></i> 1. Objetivo do Produto
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            Esta plataforma visa conectar diretamente <strong>Embarcadores (Clientes)</strong> e <strong>Caminhoneiros (Motoristas)</strong> para cotação e contratação de fretes. A monetização é baseada no modelo <strong>SaaS / Assinatura</strong>, exigindo plano ativo para liberação de contatos de ambas as partes.
          </p>
        </section>

        <section class="space-y-4">
          <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-users text-blue-600"></i> 2. Perfis de Usuário
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <span class="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">Administrador</span>
              <p class="text-xs text-slate-600 mt-2">Gestão total, aprovação prévia de anúncios de frete/veículos e gerenciamento de planos de assinatura.</p>
            </div>
            <div class="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <span class="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Embarcador (Cliente)</span>
              <p class="text-xs text-slate-600 mt-2">Publica demandas de transporte e busca motoristas disponíveis na região.</p>
            </div>
            <div class="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <span class="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Motorista (Caminhoneiro)</span>
              <p class="text-xs text-slate-600 mt-2">Cadastra veículo, capacidade de carga, documentação e visualiza solicitações de frete.</p>
            </div>
          </div>
        </section>

        <section class="space-y-3">
          <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-credit-card text-blue-600"></i> 3. Modelo de Receita & Assinaturas
          </h3>
          <ul class="list-disc pl-5 text-sm text-slate-600 space-y-2">
            <li><strong>Degustação Inicial:</strong> 1º mês gratuito para atração de novos usuários.</li>
            <li><strong>Cobrança recorrente:</strong> Pagamento via Gateway Integrado ou Carteira do Sistema.</li>
            <li><strong>Acesso Privilegiado:</strong> Dados de contato e detalhes do anúncio ficam <em>desfocados (blurred)</em> para usuários sem plano ativo.</li>
          </ul>
        </section>

        <section class="space-y-3">
          <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-user-plus text-blue-600"></i> 4. Fluxo de Cadastro e Validação
          </h3>
          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-4 text-xs text-slate-700 space-y-2">
            <p><strong>Autenticação via OTP (SMS/WhatsApp)</strong> para confirmação de número de telefone e Social Login via Google.</p>
            <p><strong>Validação pelo Admin:</strong> Motoristas passam por checagem obrigatória de documento de identidade e comprovante do veículo antes da liberação da conta.</p>
          </div>
        </section>

        <section class="space-y-3">
          <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-truck-ramp-box text-blue-600"></i> 5. Cadastro de Demandas & Veículos
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="p-4 border border-slate-200 rounded-xl">
              <strong class="text-slate-900 block mb-2 font-semibold">Demandas do Embarcador:</strong>
              <p class="text-slate-600">Nome do frete, Imagem da carga, Dimensões, Peso, Endereço de Coleta (Sem PIN do Google) e Status (Ativo/Inativo).</p>
            </div>
            <div class="p-4 border border-slate-200 rounded-xl">
              <strong class="text-slate-900 block mb-2 font-semibold">Perfil do Motorista:</strong>
              <p class="text-slate-600">Nome, Foto do veículo, Capacidade volumétrica, Cidade/CEP de atuação e Status de disponibilidade.</p>
            </div>
          </div>
        </section>

        <section class="space-y-3 pb-4">
          <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-map-location-dot text-blue-600"></i> 6. Exibição Web & Visualização em Mapa
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed">
            O mapa exibe apenas <strong>PINs de localização por cidade/região</strong>. Informações sensíveis do frete ou do motorista aparecem protegidas/desfocadas até a confirmação da assinatura ativa.
          </p>
        </section>

      </div>
    `;
  },

  openImageModal(index) {
    const item = window.currentGridItems ? window.currentGridItems[index] : null;
    if (!item) return;

    this.closeImageModal();
    const itemTitle = item.label || item.name;

    const modalHtml = `
      <div id="image-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div class="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
          
          <button 
            onclick="Renderers.closeImageModal()" 
            class="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <div class="md:w-2/3 bg-slate-950 flex items-center justify-center p-4 overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
            <img src="${item.path}" alt="${itemTitle}" class="max-h-[70vh] w-auto object-contain rounded-lg shadow-md" />
          </div>

          <div class="md:w-1/3 p-6 flex flex-col justify-between bg-slate-900 overflow-y-auto">
            <div>
              <span class="inline-block px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-500/10 rounded-full mb-3 border border-indigo-500/20">
                Detalhamento do Ativo
              </span>
              <h3 class="text-base font-bold text-white break-all mb-1">${itemTitle}</h3>
              <p class="text-[11px] text-slate-500 mb-4 font-mono truncate">${item.path}</p>
              
              <hr class="border-slate-800 my-4" />
              
              <div class="space-y-2">
                <h4 class="text-xs font-semibold text-slate-300 uppercase tracking-wider">Insight do Projeto</h4>
                <p class="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                  ${item.insight || 'Nenhuma informação adicional cadastrada.'}
                </p>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-800/80 flex justify-end">
              <a 
                href="${item.path}" 
                target="_blank" 
                class="px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition shadow-sm"
              >
                Ver Imagem Original
              </a>
            </div>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.addEventListener('keydown', handleEscKey);
  },

  closeImageModal() {
    const modal = document.getElementById("image-modal");
    if (modal) {
      modal.remove();
      document.removeEventListener('keydown', handleEscKey);
    }
  }
};

window.Renderers = Renderers;

function handleEscKey(e) {
  if (e.key === 'Escape') Renderers.closeImageModal();
}