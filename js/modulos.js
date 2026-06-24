// --- HELPERS PARA LOCALSTORAGE ---
const obtenerPersonasLS = () => JSON.parse(localStorage.getItem("personas")) || [];
const guardarPersonasLS = (datos) => localStorage.setItem("personas", JSON.stringify(datos));

// --- FUNCIONES CRUD ---

function guardarNuevaPersona(nuevaPersona) {
    const listaPersonas = obtenerPersonasLS();
    listaPersonas.push(nuevaPersona);
    guardarPersonasLS(listaPersonas);
}

function renderizarPersonas(personasData = null) {
    const contenedor = document.getElementById("listadoPersonas");
    
    // Si no pasan datos por parámetro, busca todos los de localStorage
    const listaAMostrar = personasData ?? obtenerPersonasLS();

    let contenidoHTML = "";
    listaAMostrar.forEach(item => {
        contenidoHTML += `
            <div class="persona">
                <div class="info">
                    <p>Nombre: ${item.nombre}</p>
                    <p>Edad: ${item.edad}</p>
                    <p>Dni: ${item.dni}</p>
                </div>
                <div class="botones">
                    <button onclick="prepararFormularioEdicion('${item.dni}')">Modificar</button>
                    <button onclick="borrarPersona('${item.dni}')">Eliminar</button>
                </div>
            </div>
        `;
    });
    
    contenedor.innerHTML = contenidoHTML;
}

function filtrarPersonas(nombreBusqueda, dniBusqueda) {
    const listaPersonas = obtenerPersonasLS();
    return listaPersonas.filter(item =>
        item.nombre.toLowerCase().includes(nombreBusqueda.toLowerCase()) && item.dni.includes(dniBusqueda)
    );
}

function prepararFormularioEdicion(dniBuscado) {
    const listaPersonas = obtenerPersonasLS();
    const personaEncontrada = listaPersonas.find(item => item.dni === dniBuscado);

    if (!personaEncontrada) return;

    const formEdit = document.getElementById("form-modificar");
    formEdit.querySelector("h3").textContent = `Modificar datos persona DNI ${personaEncontrada.dni}`;
    formEdit.dni.value = personaEncontrada.dni;
    formEdit.nombre.value = personaEncontrada.nombre;
    formEdit.edad.value = personaEncontrada.edad;
    formEdit.style.display = "block";
}

function actualizarDatosPersona(datosModificados) {
    const listaPersonas = obtenerPersonasLS();
    const index = listaPersonas.findIndex(item => item.dni === datosModificados.dni);
    
    if (index !== -1) {
        listaPersonas[index].nombre = datosModificados.nombre;
        listaPersonas[index].edad = datosModificados.edad;
        guardarPersonasLS(listaPersonas);
    }
}

function borrarPersona(dniEliminar) {
    let listaPersonas = obtenerPersonasLS();
    listaPersonas = listaPersonas.filter(item => item.dni !== dniEliminar);
    guardarPersonasLS(listaPersonas);
    renderizarPersonas();
}
