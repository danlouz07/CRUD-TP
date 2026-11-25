// ===== Render en pantalla (la salida de la consigna va por consola en modulos.js) =====
function renderizarPersonas(lista = personas) {
    const cont = document.querySelector("#listadoPersonas");
    cont.innerHTML = "";

    lista.forEach(p => {
        const div = document.createElement("div");
        div.className = "persona";
        div.innerHTML = `
            <div class="info">
                <p>Nombre: </p>
                <p>Edad: </p>
                <p>Dni: </p>
            </div>
            <div class="botones">
                <button class="btn-modificar">Modificar</button>
                <button class="btn-eliminar">Eliminar</button>
            </div>
        `;
        const [pNombre, pEdad, pDni] = div.querySelectorAll(".info p");
        pNombre.append(p.nombre);
        pEdad.append(p.edad);
        pDni.append(p.dni);

        div.querySelector(".btn-modificar").addEventListener("click", () => cargarFormModificar(p.dni));
        div.querySelector(".btn-eliminar").addEventListener("click", () => {
            if (eliminarPersona(p.dni)) {
                mostrarMensaje("Persona eliminada");
            }
            renderizarPersonas();
        });
        cont.appendChild(div);
    });
}

function cargarFormModificar(dni) {
    const persona = personas.find(p => p.dni === dni);
    if (!persona) return;

    const form = document.querySelector("#form-modificar");
    form.querySelector("h3").textContent = `Modificar datos persona DNI ${persona.dni}`;
    form.dni.value = persona.dni;
    form.nombre.value = persona.nombre;
    form.edad.value = persona.edad;
    form.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {

    mostrarPersonas();   // salida por consola
    renderizarPersonas(); // salida en pantalla

    // Agregar
    document.querySelector("#btn-agregar").addEventListener("click", () => {
        document.querySelector("#form-agregar").style.display = "block";
    });

    document.querySelector(".btn-cerrar-formAgregar").addEventListener("click", () => {
        document.querySelector("#form-agregar").style.display = "none";
    });

    const formAgregar = document.querySelector("#form-agregar");
    formAgregar.addEventListener("submit", (event) => {
        event.preventDefault();
        const ok = agregarPersona({
            nombre: formAgregar.nombre.value,
            edad: formAgregar.edad.value,
            dni: formAgregar.dni.value
        });
        if (ok) {
            mostrarMensaje("Persona agregada");
            formAgregar.reset();
            formAgregar.style.display = "none";
        } else {
            mostrarMensaje("No se pudo agregar (datos inválidos o DNI repetido)");
        }
        renderizarPersonas();
    });

    // Buscar: por DNI (buscarPersona) y/o por nombre (buscarPersonas)
    const formBuscar = document.querySelector("#form-buscar");
    formBuscar.addEventListener("submit", (event) => {
        event.preventDefault();
        const nombre = formBuscar.nombre.value.trim();
        const dni = formBuscar.dni.value.trim();

        let resultados = personas;
        if (nombre) resultados = buscarPersonas(nombre);
        if (dni) {
            const p = buscarPersona(dni);
            resultados = resultados.filter(x => x === p);
        }
        if (!nombre && !dni) mostrarPersonas();
        renderizarPersonas(resultados);
    });

    document.querySelector("#btn-filtros").addEventListener("click", () => {
        formBuscar.reset();
        mostrarPersonas();
        renderizarPersonas();
    });

    // Modificar
    document.querySelector(".btn-cerrar-formModif").addEventListener("click", () => {
        document.querySelector("#form-modificar").style.display = "none";
    });

    const formModificar = document.querySelector("#form-modificar");
    formModificar.addEventListener("submit", (event) => {
        event.preventDefault();
        const ok = modificarPersona(formModificar.dni.value, {
            nombre: formModificar.nombre.value,
            edad: formModificar.edad.value
        });
        mostrarMensaje(ok ? "Persona modificada" : "No se pudo modificar");
        if (ok) {
            formModificar.reset();
            formModificar.style.display = "none";
        }
        renderizarPersonas();
    });

});
