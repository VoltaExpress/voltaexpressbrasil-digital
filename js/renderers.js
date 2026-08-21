import { escapeHtml } from "./config.js";

/**
 * Renderizador de arquivos no container principal
 */
export const Renderers = {
  renderPdf(file, container) {
    container.innerHTML = `<iframe src="${file.path}" class="w-full h-full min-h-[550px] rounded-xl border border-slate-200 shadow-sm"></iframe>`;
  },

  renderImage(file, container) {
    container.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center p-4">
        <img src="${file.path}" alt="${file.name}" class="max-h-[500px] rounded-xl border border-slate-200 shadow-md object-contain bg-white p-2">
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
    // 1. Estado de Carregamento (Loading)
    container.innerHTML = `
      <div class="p-8 text-center text-slate-500 flex items-center justify-center gap-2">
        <i class="fa-solid fa-spinner fa-spin text-blue-600 text-lg"></i>
        <span>Lendo código fonte...</span>
      </div>
    `;

    // 2. Mapeamento da linguagem para o Prism.js
    const langMap = {
      js: "javascript",
      css: "css",
      json: "json",
      html: "html",
      ts: "typescript"
    };
    const language = langMap[file.ext] || "javascript";

    // 3. Busca o texto do arquivo .js / .json / .css
    fetch(file.path)
      .then(response => {
        if (!response.ok) throw new Error("Não foi possível carregar o arquivo de código.");
        return response.text();
      })
      .then(codeText => {
        // Sanitiza o código para evitar que tags HTML no código quebrem o DOM
        const safeCode = codeText
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        // 4. Renderiza a estrutura visual de editor de código
        container.innerHTML = `
          <div class="max-w-5xl mx-auto my-4 bg-slate-900 rounded-xl shadow-lg border border-slate-800 overflow-hidden flex flex-col">
            <!-- Barra Superior / Header do Arquivo -->
            <div class="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                <span class="ml-2 text-xs font-mono text-slate-400">${file.name}</span>
              </div>
              <span class="text-[10px] font-mono text-blue-400 uppercase bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">${language}</span>
            </div>

            <!-- Bloco do Código -->
            <div class="p-4 overflow-x-auto text-xs font-mono leading-relaxed">
              <pre class="!bg-transparent !m-0 !p-0"><code class="language-${language}">${safeCode}</code></pre>
            </div>
          </div>
        `;

        // 5. Aciona o destaque de sintaxe do Prism.js se disponível
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
            <p class="font-bold text-slate-800 mb-1">Planilha Excel de Captura de Dados</p>
            <p>Caminho: ${file.path}</p>
            <p class="mt-2 text-slate-500">${file.insight}</p>
          </div>
        `;
      });
  },

  renderDefault(file, container) {
    container.innerHTML = `
      <div class="p-6 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
        <p class="font-bold text-slate-800 text-sm">${file.name}</p>
        <p class="font-mono text-slate-400 text-[11px]">${file.path}</p>
        <div class="mt-4 p-3 bg-slate-50 rounded border border-slate-200">
          <p class="font-semibold text-slate-700 mb-1">Resumo Executivo:</p>
          <p>${file.insight}</p>
        </div>
      </div>
    `;
  },

  /**
   * Renderiza a Grid de Imagens quando a pasta qa-infos for clicada
   */
  renderFolderGrid(folder, container) {
    const targetArea = container || document.getElementById("viewerContainer") || document.getElementById("main-content");
    if (!targetArea) return;

    window.currentGridItems = folder.children || [];

    targetArea.innerHTML = `
      <div class="mb-6 border-b border-slate-700/60 pb-4">
        <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <i class="fa-solid fa-folder-open text-blue-400"></i> ${folder.name}
        </h2>
        <p class="text-xs text-slate-400 mt-1">
          Exibindo ${window.currentGridItems.length} evidências e registros visuais de testes de QA
        </p>
      </div>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        ${window.currentGridItems.map((file, index) => `
          <div 
            onclick="Renderers.openImageModal(${index})"
            class="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-700/80 cursor-pointer hover:border-indigo-500 transition-all duration-200 shadow-md hover:shadow-indigo-500/20"
          >
            <div class="aspect-square w-full overflow-hidden flex items-center justify-center bg-slate-950/60">
              <img 
                src="${file.path}" 
                alt="${file.name}" 
                loading="lazy" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div class="p-2.5 bg-slate-900/90 border-t border-slate-800">
              <p class="text-xs font-medium text-slate-300 truncate" title="${file.name}">${file.name}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  /**
   * Abre o Modal com a imagem ampliada e os Insights
   */
  openImageModal(index) {
    const item = window.currentGridItems ? window.currentGridItems[index] : null;
    if (!item) return;

    this.closeImageModal();

    const modalHtml = `
      <div id="image-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div class="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
          
          <!-- Botão Fechar -->
          <button 
            onclick="Renderers.closeImageModal()" 
            class="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Lado Esquerdo: Imagem Ampliada -->
          <div class="md:w-2/3 bg-slate-950 flex items-center justify-center p-4 overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
            <img src="${item.path}" alt="${item.name}" class="max-h-[70vh] w-auto object-contain rounded-lg shadow-md" />
          </div>

          <!-- Lado Direito: Informações e Insights -->
          <div class="md:w-1/3 p-6 flex flex-col justify-between bg-slate-900 overflow-y-auto">
            <div>
              <span class="inline-block px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-500/10 rounded-full mb-3 border border-indigo-500/20">
                Garantia de Qualidade (QA)
              </span>
              <h3 class="text-base font-bold text-white break-all mb-1">${item.name}</h3>
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

  /**
   * Destrói o Modal da DOM
   */
  closeImageModal() {
    const modal = document.getElementById("image-modal");
    if (modal) {
      modal.remove();
      document.removeEventListener('keydown', handleEscKey);
    }
  }
};

// Exporta e vincula no escopo global da janela para chamadas de evento inline
window.Renderers = Renderers;

function handleEscKey(e) {
  if (e.key === 'Escape') Renderers.closeImageModal();
}