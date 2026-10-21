const ASISTENCIA_KEY = "neoGokuFitAsistenciasV1";
const tabla = document.getElementById("tabla-asistencias");
const filtro = document.getElementById("filtro-usuario");
const panelEdicion = document.getElementById("panel-edicion");
const formulario = document.getElementById("form-edicion");
let idEditando = null;

function obtenerRegistros() {
    try {
        const registros = JSON.parse(localStorage.getItem(ASISTENCIA_KEY) || "[]");
        return Array.isArray(registros) ? registros : [];
    } catch (error) {
        return [];
    }
}

function guardarRegistros(registros) {
    localStorage.setItem(ASISTENCIA_KEY, JSON.stringify(registros));
}

function mostrarHistorial() {
    tabla.innerHTML = "";
    const usuarios = get_user_list();
    const busqueda = filtro.value.trim().toLowerCase();
    const registros = obtenerRegistros().filter(registro => {
        const usuario = usuarios.find(u => u.email === registro.email);
        const nombre = usuario ? usuario.name : "";
        return (nombre + " " + registro.email).toLowerCase().includes(busqueda);
    }).sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));

    if (registros.length === 0) {
        const fila = tabla.insertRow();
        const celda = fila.insertCell();
        celda.colSpan = 5;
        celda.textContent = "No hay asistencias registradas.";
        return;
    }

    registros.forEach(registro => {
        const usuario = usuarios.find(u => u.email === registro.email);
        const fila = tabla.insertRow();
        const datos = [usuario ? usuario.name : registro.email, registro.fecha, registro.hora, registro.tipo];
        datos.forEach(valor => fila.insertCell().textContent = valor);

        const acciones = fila.insertCell();
        const editar = document.createElement("button");
        editar.type = "button";
        editar.textContent = "Modificar";
        editar.addEventListener("click", () => editarRegistro(registro.id));

        const eliminar = document.createElement("button");
        eliminar.type = "button";
        eliminar.textContent = "Eliminar";
        eliminar.addEventListener("click", () => eliminarRegistro(registro.id));
        acciones.append(editar, eliminar);
    });
}

function editarRegistro(id) {
    const registro = obtenerRegistros().find(r => r.id === id);
    if (!registro) return;
    idEditando = id;
    document.getElementById("editar-fecha").value = registro.fecha;
    document.getElementById("editar-hora").value = registro.hora;
    document.getElementById("editar-tipo").value = registro.tipo;
    panelEdicion.hidden = false;
}

function eliminarRegistro(id) {
    if (!confirm("¿Eliminar este registro de asistencia?")) return;
    try {
        guardarRegistros(obtenerRegistros().filter(r => r.id !== id));
        if (idEditando === id) cancelarEdicion();
        mostrarHistorial();
    } catch (error) {
        alert("No se pudo eliminar el registro.");
    }
}

function cancelarEdicion() {
    idEditando = null;
    panelEdicion.hidden = true;
    formulario.reset();
}

function guardarEdicion(event) {
    event.preventDefault();
    const registros = obtenerRegistros();
    const registro = registros.find(r => r.id === idEditando);
    if (!registro) {
        alert("El registro ya no existe.");
        cancelarEdicion();
        return;
    }
    registro.fecha = document.getElementById("editar-fecha").value;
    registro.hora = document.getElementById("editar-hora").value;
    registro.tipo = document.getElementById("editar-tipo").value;
    if (!registro.fecha || !registro.hora || !["Ingreso", "Salida"].includes(registro.tipo)) return;
    try {
        guardarRegistros(registros);
        cancelarEdicion();
        mostrarHistorial();
    } catch (error) {
        alert("No se pudo modificar el registro.");
    }
}

filtro.addEventListener("input", mostrarHistorial);
formulario.addEventListener("submit", guardarEdicion);
document.getElementById("cancelar-edicion").addEventListener("click", cancelarEdicion);
window.addEventListener("storage", mostrarHistorial);
mostrarHistorial();
