// ===== Datos =====
// Array "personas": cada ítem es un objeto { nombre, edad, dni }.
// Se persiste en localStorage; si está vacío se usan estos datos iniciales.
const personasIniciales = [
    { nombre: "Juan", edad: 25, dni: "30111222" },
    { nombre: "María", edad: 31, dni: "28333444" },
    { nombre: "Juan", edad: 42, dni: "20555666" }
];

let personas = JSON.parse(localStorage.getItem("personas")) || personasIniciales;

function guardarPersonas() {
    localStorage.setItem("personas", JSON.stringify(personas));
}

// ===== Funciones (todas las salidas se muestran por consola) =====

// 1) Mostrar personas
function mostrarPersonas(lista = personas) {
    if (lista.length === 0) {
        console.log("No hay personas para mostrar.");
        return;
    }
    console.log("Listado de personas:");
    lista.forEach((p, i) => {
        console.log(`${i + 1}) Nombre: ${p.nombre} | Edad: ${p.edad} | DNI: ${p.dni}`);
    });
}

// 2) Agregar persona (agrega un objeto al array)
function agregarPersona(persona) {
    const nueva = {
        nombre: String(persona.nombre).trim(),
        edad: Number(persona.edad),
        dni: String(persona.dni).trim()
    };

    if (!nueva.nombre || !nueva.dni || !Number.isFinite(nueva.edad) || nueva.edad < 0) {
        console.error("Datos inválidos: se requiere nombre, edad (número) y DNI.");
        return false;
    }
    if (personas.some(p => p.dni === nueva.dni)) {
        console.error(`Ya existe una persona con DNI ${nueva.dni}.`);
        return false;
    }

    personas.push(nueva);
    guardarPersonas();
    console.log("Persona agregada:", nueva);
    return true;
}

// 3) Buscar persona por DNI (el DNI es único: devuelve una persona o undefined)
function buscarPersona(dni) {
    const persona = personas.find(p => p.dni === String(dni).trim());
    if (persona) {
        console.log(`Persona encontrada (DNI ${persona.dni}):`, persona);
    } else {
        console.log(`No se encontró ninguna persona con DNI ${dni}.`);
    }
    return persona;
}

// 4) Buscar personas por nombre (puede haber varias con el mismo nombre)
function buscarPersonas(nombre) {
    const buscado = String(nombre).trim().toLowerCase();
    const resultados = personas.filter(p => p.nombre.toLowerCase() === buscado);
    if (resultados.length === 0) {
        console.log(`No se encontraron personas con nombre "${nombre}".`);
    } else {
        console.log(`Se encontraron ${resultados.length} persona(s) con nombre "${nombre}":`);
        mostrarPersonas(resultados);
    }
    return resultados;
}

// 5) Eliminar persona por DNI
function eliminarPersona(dni) {
    const indice = personas.findIndex(p => p.dni === String(dni).trim());
    if (indice === -1) {
        console.error(`No se puede eliminar: no existe persona con DNI ${dni}.`);
        return false;
    }
    const [eliminada] = personas.splice(indice, 1);
    guardarPersonas();
    console.log("Persona eliminada:", eliminada);
    return true;
}

// 6) Modificar persona por DNI (el DNI identifica, se modifican nombre y/o edad)
function modificarPersona(dni, datos) {
    const persona = personas.find(p => p.dni === String(dni).trim());
    if (!persona) {
        console.error(`No se puede modificar: no existe persona con DNI ${dni}.`);
        return false;
    }

    if (datos.nombre !== undefined && String(datos.nombre).trim() !== "") {
        persona.nombre = String(datos.nombre).trim();
    }
    if (datos.edad !== undefined && datos.edad !== "") {
        const edad = Number(datos.edad);
        if (!Number.isFinite(edad) || edad < 0) {
            console.error("Edad inválida: no se modificó la edad.");
            return false;
        }
        persona.edad = edad;
    }

    guardarPersonas();
    console.log("Persona modificada:", persona);
    return true;
}
