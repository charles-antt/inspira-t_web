document.addEventListener("DOMContentLoaded", () => {
    const topbarContainer = document.getElementById("topbar-container");
    if (!topbarContainer) return;

    // 1. Configura los títulos y descripciones de cada vista
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
        },
        "perfil_instructor.html": {
            titulo: "Mi perfil",
            descripcion: "Consulta y actualiza tu información personal."
        }
    };

    // 2. Detecta la página actual y verifica si es vista de instructor
    const paginaActual = window.location.pathname.split("/").pop();
    const esInstructor = paginaActual === "inicio_instructor.html" || paginaActual === "subir_contenido.html" || paginaActual === "perfil_instructor.html";
    const datos = infoPaginas[paginaActual];

    // 3. Define el enlace y la foto del avatar según el rol
    const enlacePerfil = esInstructor
        ? "../html/perfil_instructor.html"
        : "../html/perfil_aprendiente.html";

    const imagenAvatar = esInstructor
        ? "../assiest/images/instructor_image.svg"
        : "../assiest/images/aprendiente_image.svg";

    // 4. Genera el bloque izquierdo solo si la página tiene título configurado
    const bloqueTituloHTML = datos
        ? `<div class="topbar-info">
             <h1>${datos.titulo}</h1>
             <p>${datos.descripcion}</p>
           </div>`
        : `<div></div>`;

    // 5. Inserta el HTML completo de la barra superior
    topbarContainer.innerHTML = `
        <header class="topbar">
            ${bloqueTituloHTML}
            <div class="icons">
                <button type="button" class="bell" title="Notificaciones">
                    <i data-lucide="bell"></i>
                </button>
                <a href="${enlacePerfil}" class="avatar" aria-label="Mi perfil">
                    <img src="${imagenAvatar}" alt="Foto de perfil">
                </a>
            </div>
        </header>
    `;

    // 6. Renderiza los íconos de Lucide
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});
