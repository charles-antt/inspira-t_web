document.addEventListener("DOMContentLoaded", () => {
    const topbarContainer = document.getElementById("topbar-container");
    if (!topbarContainer) return;

    // Inserta el HTML de tu barra superior
    topbarContainer.innerHTML = `
    <header class="topbar">
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

    // Renderiza el ícono de la campana de Lucide
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});
