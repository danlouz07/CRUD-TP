document.addEventListener("DOMContentLoaded", () => {

    renderizarPersonas();

    const formAgregar = document.getElementById("form-agregar");
    const formBuscar = document.getElementById("form-buscar");
    const formModificar = document.getElementById("form-modificar");

    // --- SECCIÓN: AGREGAR ---
    document.getElementById("btn-agregar").addEventListener("click", () => {
        formAgregar.style.display = "block";
    });

    document.querySelector(".btn-cerrar-formAgregar").addEventListener("click", () => {
        formAgregar.style.display = "none";
    });

    formAgregar.addEventListener("submit", (e) => {
        e.preventDefault();
        guardarNuevaPersona({
            nombre: formAgregar.nombre.value,
            edad: formAgregar.edad.value,
            dni: formAgregar.dni.value
        });
        formAgregar.reset();
        formAgregar.style.display = "none";
        renderizarPersonas();
    });

    // --- SECCIÓN: BUSCAR / FILTRAR ---
    formBuscar.addEventListener("submit", (e) => {
        e.preventDefault();
        const resultados = filtrarPersonas(formBuscar.nombre.value, formBuscar.dni.value);
        renderizarPersonas(resultados);
    });

    document.getElementById("btn-filtros").addEventListener("click", () => {
        formBuscar.reset();
        renderizarPersonas();
    });

    // --- SECCIÓN: MODIFICAR ---
    document.querySelector(".btn-cerrar-formModif").addEventListener("click", () => {
        formModificar.style.display = "none";
    });

    formModificar.addEventListener("submit", (e) => {
        e.preventDefault();
        actualizarDatosPersona({
            nombre: formModificar.nombre.value,
            edad: formModificar.edad.value,
            dni: formModificar.dni.value
        });
        formModificar.reset();
        formModificar.style.display = "none";
        renderizarPersonas();
    });

});
