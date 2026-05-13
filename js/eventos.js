// este archivo responde a los evento del DOM,
// interactuando con el usuario y el modelo de datos desarrollado en modulos.js

document.addEventListener("DOMContentLoaded", () => {

    //cargamos listado de personas


    //Mostrar formulario para agregar Persona desde el boton "Agregar Persona"

    const btnAgregarPersona = document.querySelector("#btn-agregar");
     btnAgregarPersona.addEventListener("click", () => {
        document.querySelector("#form-agregar").style.display = "block";
    });

    const btnCerrarFormAgregar = document.querySelector(".btn-cerrar-formAgregar");
    btnCerrarFormAgregar.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#form-agregar").style.display = "none";
    });

 

    //Ocultar formulario "Agregar persona" desde el boton "cerrar" o X
   

    
    //evento "submit" formulario "AgregarPersona"
 

    //----------------------------------------------------------------------------------------------------------
    //El evento de mostraFormularioModificar y cerrar formulario queda dentro de la funcion mostrarPersonas
    //porque pueden ser varios botones y es necesario individualizarlos para capturar los datos de cada persona
    //lo mismo para el boton eliminar queda dentro de la funcion mostrarPersonas
    //----------------------------------------------------------------------------------------------------------


    //evento "submit" formulario buscar
   

    //boton limpiar filtros
   

    //evento "submit" formulario modificar
   
})
