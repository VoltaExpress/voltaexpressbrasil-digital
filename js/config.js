/**
 * Volta Express Brasil - Configurações Globais do Digital Hub
 */
export const CONFIG = {
  appName: "Volta Express Brasil",
  appVersion: "v6.0 Digital",
  baseAssetPath: "assets/",
  totalAssetsCount: 250,
  totalDirectoriesCount: 38,
  
  // Mapeamento de Ícones por Extensão
  icons: {
    pdf: "fa-file-pdf text-red-400",
    xlsx: "fa-file-excel text-emerald-400",
    js: "fa-file-code text-amber-400",
    css: "fa-file-code text-amber-400",
    json: "fa-file-code text-amber-400",
    img: "fa-file-image text-purple-400",
    video: "fa-file-video text-blue-400",
    doc: "fa-file-word text-cyan-400",
    default: "fa-file text-slate-400"
  }
};

/**
 * Escapa strings HTML para segurança no renderizador de código
 */
export function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}