document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainer = document.getElementById("sidebar-container");
    if (!sidebarContainer) return;

    // 1. Detecta la página actual y verifica si es una vista de instructor
    const paginaActual = window.location.pathname.split("/").pop() || "inicio_aprendiente.html";
    const esInstructor = paginaActual === "inicio_instructor.html" || paginaActual === "subir_contenido.html" || paginaActual === "perfil_instructor.html";

    // 2. Define las opciones del menú según el rol
    const enlacesMenu = esInstructor
        ? `
            <a href="../html/inicio_instructor.html" style="display: flex; align-items: center; gap: 10px;">
                <i data-lucide="home" class="menuIcons"></i>
                <span class="menuOptions">Inicio</span>
            </a>
        `
        : `
            <a href="../html/inicio_aprendiente.html" style="display: flex; align-items: center; gap: 10px;">
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
        `;

    // 3. Inserta el HTML completo de la barra lateral
    sidebarContainer.innerHTML = `
        <aside class="sidebar">
            <div class="brand">
                <img src="../assiest/images/isotipo_blanco.svg" alt="Logo inspira-T">
            </div>
            <nav>
                ${enlacesMenu}
            </nav>

            <!-- Ilustración decorativa inferior -->
            <div class="sidebar-illustration" style="margin-top: auto; text-align: center;">
                <img src="../assiest/images/maceta.svg" alt="" aria-hidden="true">
            </div>
        </aside>
    `;

    // 4. Activa el enlace correspondiente a la página actual
    const enlaces = sidebarContainer.querySelectorAll("nav a");

    enlaces.forEach((enlace) => {
        enlace.classList.remove("active");
        const href = enlace.getAttribute("href").split("/").pop();
        if (href === paginaActual) {
            enlace.classList.add("active");
        }
    });

    // 5. Renderiza los íconos de Lucide recién insertados
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});
