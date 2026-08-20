import { CONFIG } from "./config.js";
import { fileData } from "./data.js";
import { Renderers } from "./renderers.js";

export class UIController {
    constructor() {
        this.treeContainer = document.getElementById("treeContainer");
        this.searchInput = document.getElementById("fileSearch");
        this.currentSelectedFile = null;
    }

    init() {
        this.renderTree();
        this.updateTotalCount();
        this.setupSearch();
        this.setupMobileMenu();
    }

    updateTotalCount() {
        let count = 0;
        function countFiles(nodes) {
            nodes.forEach(node => {
                if (node.type === "file") count++;
                if (node.children) countFiles(node.children);
            });
        }
        countFiles(fileData);
        const totalEl = document.getElementById("totalFilesCount");
        if (totalEl) totalEl.textContent = count;
    }

    renderTree(filteredData = fileData) {
        this.treeContainer.innerHTML = "";
        this.treeContainer.appendChild(this.createTreeNodes(filteredData));
    }

    createTreeNodes(nodes) {
        const ul = document.createElement("ul");
        ul.className = "space-y-1 pl-2 border-l border-slate-800/60";

        nodes.forEach(node => {
            const li = document.createElement("li");

            if (node.type === "folder") {
                const folderDiv = document.createElement("div");
                folderDiv.className = "flex items-center space-x-2 py-1.5 px-2 rounded cursor-pointer hover:bg-slate-800/60 text-slate-300 font-medium transition select-none text-xs";
                folderDiv.innerHTML = `
          <i class="fa-solid fa-folder text-blue-400 text-xs"></i>
          <span class="truncate">${node.name}</span>
        `;

                const childUlContainer = document.createElement("div");
                childUlContainer.className = "hidden";
                if (node.children) {
                    childUlContainer.appendChild(this.createTreeNodes(node.children));
                }

                folderDiv.addEventListener("click", (e) => {
                    e.stopPropagation();
                    childUlContainer.classList.toggle("hidden");
                    const icon = folderDiv.querySelector("i");
                    icon.classList.toggle("fa-folder");
                    icon.classList.toggle("fa-folder-open");
                });

                li.appendChild(folderDiv);
                li.appendChild(childUlContainer);
            } else {
                const fileDiv = document.createElement("div");
                fileDiv.className = "tree-file-item flex items-center space-x-2 py-1 px-2 rounded cursor-pointer hover:bg-slate-800 hover:text-white text-slate-400 transition select-none text-[11px]";

                const iconClass = CONFIG.icons[node.ext] || CONFIG.icons.default || "fa-file";

                fileDiv.innerHTML = `
          <i class="fa-solid ${iconClass}"></i>
          <span class="truncate">${node.name}</span>
        `;

                fileDiv.addEventListener("click", (e) => {
                    e.stopPropagation();
                    document.querySelectorAll("#treeContainer div").forEach(el => {
                        el.classList.remove("bg-blue-600/20", "text-blue-300", "font-semibold", "active");
                    });
                    fileDiv.classList.add("bg-blue-600/20", "text-blue-300", "font-semibold", "active");
                    this.openFile(node);

                    // Fechar drawer no mobile ao selecionar um arquivo
                    const sidebar = document.getElementById("sidebar");
                    const overlay = document.getElementById("mobileOverlay");
                    if (sidebar && overlay && window.innerWidth < 768) {
                        sidebar.classList.add("-translate-x-full");
                        overlay.classList.add("hidden");
                    }
                });

                li.appendChild(fileDiv);
            }

            ul.appendChild(li);
        });

        return ul;
    }

    openFile(file) {
        this.currentSelectedFile = file;

        // Atualizar títulos e caminhos
        const fileNameEl = document.getElementById("currentFileName");
        const filePathEl = document.getElementById("currentFilePath");
        const insightTextEl = document.getElementById("insightText");
        const fileTypeIconEl = document.getElementById("fileTypeIcon");

        if (fileNameEl) fileNameEl.textContent = file.name;
        if (filePathEl) filePathEl.textContent = `/${file.path}`;
        if (insightTextEl) insightTextEl.textContent = file.insight || "Ativo estratégico registrado no repositório da Volta Express.";

        // Atualizar o ícone do cabeçalho dinamicamente
        if (fileTypeIconEl) {
            const iconClass = CONFIG.icons[file.ext] || CONFIG.icons.default || "fa-file";
            fileTypeIconEl.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
        }

        const container = document.getElementById("viewerContainer");
        if (!container) return;
        container.innerHTML = "";

        // Renderizar conteúdo pelo formato
        if (file.ext === "pdf") Renderers.renderPdf(file, container);
        else if (file.ext === "img") Renderers.renderImage(file, container);
        else if (file.ext === "video") Renderers.renderVideo(file, container);
        else if (["js", "css", "json"].includes(file.ext)) Renderers.renderCode(file, container);
        else if (file.ext === "xlsx") Renderers.renderExcel(file, container);
        else Renderers.renderDefault(file, container);
    }

    setupSearch() {
        if (!this.searchInput) return;

        this.searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            if (!term) {
                this.renderTree(fileData);
                return;
            }

            function filterNodes(nodes) {
                return nodes.reduce((acc, node) => {
                    if (node.type === "file") {
                        if (node.name.toLowerCase().includes(term) || (node.insight && node.insight.toLowerCase().includes(term))) {
                            acc.push(node);
                        }
                    } else if (node.children) {
                        const filteredChildren = filterNodes(node.children);
                        if (filteredChildren.length > 0) {
                            acc.push({ ...node, children: filteredChildren });
                        }
                    }
                    return acc;
                }, []);
            }

            this.renderTree(filterNodes(fileData));
        });
    }

    setupMobileMenu() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const closeBtn = document.getElementById('closeSidebarBtn');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileOverlay');

        const openSidebar = () => {
            if (sidebar && overlay) {
                sidebar.classList.remove('-translate-x-full');
                overlay.classList.remove('hidden');
            }
        };

        const closeSidebar = () => {
            if (sidebar && overlay) {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            }
        };

        if (menuBtn) menuBtn.addEventListener('click', openSidebar);
        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        if (overlay) overlay.addEventListener('click', closeSidebar);
    }
}

