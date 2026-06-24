function exhibirNotificacion(mensajeTexto) {
    const contenedorMensajes = document.querySelector(".mensajes");
    contenedorMensajes.innerHTML = mensajeTexto;
    contenedorMensajes.style.display = "block";
    
    setTimeout(() => {
        contenedorMensajes.style.display = "none";
    }, 2000);
}
