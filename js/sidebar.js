document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainer = document.getElementById("sidebar-container");
    if (!sidebarContainer) return;

    // 1. Inserta el HTML completo de tu barra lateral
    sidebarContainer.innerHTML = `
    <aside class="sidebar">
        <div class="brand">
            <img src="../assiest/images/isotipo_blanco.svg" alt="Logo inspira-T">
        </div>
        <nav>
            <a href="../html/inicio_aprendiente.html" class="active" style="display: flex; align-items: center; gap: 10px;">
                <i data-lucide="home" class="menuIcons"></i>
                <span class="menuOptions">Inicio</span>
            </a>
            <a href="../html/explorar.html" style="display: flex; align-items: center; gap: 10px;">
                <i data-lucide="compass" class="menuIcons"></i>
                <span class="menuOptions">Explorar</span>
            </a>
            <a href="../html/mi_aprendizaje.html" style="display: flex; align-items: center; gap: 10px;">
                <i data-lucide="bookmark" class="menuIcons"></i>
                <span class="menuOptions">Mi aprendizaje</span>
            </a>
            <a href="../html/mis_cursos.html" style="display: flex; align-items: center; gap: 10px;">
                <i data-lucide="book-open" class="menuIcons"></i>
                <span class="menuOptions">Mis cursos</span>
            </a>
        </nav>

        <!-- Ilustración decorativa inferior -->
        <div class="sidebar-illustration" style="margin-top: auto; text-align: center;">
            <img src="../assiest/images/maceta.svg" alt="" aria-hidden="true">
        </div>
    </aside>
  `;

    // 2. Detecta la página actual y activa su enlace automáticamente
    const paginaActual = window.location.pathname.split("/").pop();
    const enlaces = sidebarContainer.querySelectorAll("nav a");

    enlaces.forEach((enlace) => {
        const href = enlace.getAttribute("href").split("/").pop();
        if (href === paginaActual) {
            enlace.classList.add("active");
        }
    });

    // 3. Renderiza los íconos de Lucide recién insertados
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});
