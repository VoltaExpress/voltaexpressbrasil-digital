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
        fetch(file.path)
            .then(res => res.text())
            .then(code => {
                const lang = file.ext === "js" ? "javascript" : file.ext;
                container.innerHTML = `<pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>`;
                if (window.Prism) window.Prism.highlightAll();
            })
            .catch(() => {
                container.innerHTML = `
          <div class="p-6 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-600">
            <p class="font-bold text-slate-800 mb-1">Visualização de Código</p>
            <p>Caminho: ${file.path}</p>
            <p class="mt-2 text-slate-400">O arquivo será renderizado assim que estiver sincronizado no repositório.</p>
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
    }
};