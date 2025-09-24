document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalOverlay");
  const btnAbrir = document.getElementById("abrirModalBtn");
  const btnCerrar = document.getElementById("cerrarModalBtn");

  if (!modal || !btnAbrir || !btnCerrar) {
    console.error("Uno de los elementos no se encontró. Verifica los IDs.");
    return;
  }

  // Abrir el modal
  btnAbrir.onclick = () => {
    modal.classList.add("visible");
  };

  // Cerrar el modal con el botón
  btnCerrar.addEventListener("click", () => {
    modal.classList.remove("visible");
  });

  // Cerrar el modal al hacer clic fuera del contenido
  window.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.remove("visible");
    }
  };
});
