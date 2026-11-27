document.addEventListener("DOMContentLoaded", () => {
    const topbarContainer = document.getElementById("topbar-container");
    if (!topbarContainer) return;

    const infoPaginas = {
        "explorar.html": {
            titulo: "Explorar",
            descripcion: "Descubre la riqueza de nuestros saberes ancestrales."
        },
        "mi_aprendizaje.html": {
            titulo: "Mi aprendizaje",
            descripcion: "Continúa con tus lecciones y revisa tu progreso."
        },
        "mis_cursos.html": {
            titulo: "Mis cursos",
            descripcion: "Administra los cursos en los que estás inscrito."
        },
        "perfil_aprendiente.html": {
            titulo: "Mi perfil",
            descripcion: "Consulta y actualiza tu información personal."
        }
    };

    // 2. Detecta la página actual
    const paginaActual = window.location.pathname.split("/").pop();
    const datos = infoPaginas[paginaActual];

    // 3. Genera el bloque izquierdo solo si la página tiene título configurado
    const bloqueTituloHTML = datos
        ? `<div class="topbar-info">
             <h1>${datos.titulo}</h1>
             <p>${datos.descripcion}</p>
           </div>`
        : `<div></div>`;

    // 4. Inserta el HTML completo de la barra superior
    topbarContainer.innerHTML = `
        <header class="topbar">
            ${bloqueTituloHTML}
            <div class="icons">
                <button type="button" class="bell" title="Notificaciones">
                    <i data-lucide="bell"></i>
                </button>
                <a href="../html/perfil_aprendiente.html" class="avatar" aria-label="Mi perfil">
                    <img src="../assiest/images/aprendiente_image.svg" alt="Foto de perfil">
                </a>
            </div>
        </header>
    `;

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});
