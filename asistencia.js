const ASISTENCIA_KEY = "neoGokuFitAsistenciasV1";

const listaUsuarios = document.getElementById("lista-usuarios");
const buscarUsuario = document.getElementById("buscar-usuario");
const usuarioSeleccionado = document.getElementById("usuario-seleccionado");
const zonaAsistencia = document.getElementById("zona-asistencia");
const formulario = document.getElementById("form-asistencia");
const mensaje = document.getElementById("mensaje-asistencia");

let emailSeleccionado = null;

function mostrarUsuarios() {
    listaUsuarios.innerHTML = "";

    const filtro = buscarUsuario.value.trim().toLowerCase();
    const usuarios = get_user_list().filter(usuario =>
        usuario.name.toLowerCase().includes(filtro) ||
        usuario.email.toLowerCase().includes(filtro)
    );

    if (usuarios.length === 0) {
        listaUsuarios.textContent = filtro ? "No se encontraron usuarios." : "No hay usuarios registrados.";
        return;
    }

    usuarios.forEach(usuario => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "usuario-item" + (usuario.email === emailSeleccionado ? " seleccionado" : "");

        const nombre = document.createElement("strong");
        nombre.textContent = usuario.name;
        const correo = document.createElement("small");
        correo.textContent = usuario.email;
        boton.append(nombre, correo);

        boton.addEventListener("click", () => seleccionarUsuario(usuario));
        listaUsuarios.appendChild(boton);
    });
}

function seleccionarUsuario(usuario) {
    emailSeleccionado = usuario.email;
    usuarioSeleccionado.textContent = usuario.name + " - " + usuario.email;
    zonaAsistencia.hidden = false;
    mensaje.textContent = "";
    mostrarUsuarios();
}

function guardarAsistencia(event) {
    event.preventDefault();

    if (!emailSeleccionado || !get_user_list().some(usuario => usuario.email === emailSeleccionado)) {
        alert("Selecciona un usuario registrado.");
        return;
    }

    const fecha = document.getElementById("fecha-asistencia").value;
    const horaIngreso = document.getElementById("hora-ingreso").value;
    const horaSalida = document.getElementById("hora-salida").value;

    if (!fecha || (!horaIngreso && !horaSalida)) {
        alert("Indica la fecha y al menos una hora: ingreso o salida.");
        return;
    }

    if (horaIngreso && horaSalida && horaSalida < horaIngreso) {
        alert("La hora de salida no puede ser anterior a la hora de ingreso.");
        return;
    }

    try {
        const registros = JSON.parse(localStorage.getItem(ASISTENCIA_KEY) || "[]");
        if (!Array.isArray(registros)) throw new Error("Datos inválidos");

        // Cada hora se guarda como un registro, compatible con el historial actual.
        if (horaIngreso) {
            registros.push({
                id: Date.now().toString(36) + Math.random().toString(36).slice(2),
                email: emailSeleccionado, fecha, hora: horaIngreso, tipo: "Ingreso"
            });
        }
        if (horaSalida) {
            registros.push({
                id: Date.now().toString(36) + Math.random().toString(36).slice(2),
                email: emailSeleccionado, fecha, hora: horaSalida, tipo: "Salida"
            });
        }

        localStorage.setItem(ASISTENCIA_KEY, JSON.stringify(registros));
        formulario.reset();
        mensaje.textContent = "Asistencia registrada correctamente.";
    } catch (error) {
        alert("No se pudo guardar la asistencia.");
    }
}

buscarUsuario.addEventListener("input", mostrarUsuarios);
formulario.addEventListener("submit", guardarAsistencia);
mostrarUsuarios();
