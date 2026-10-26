const INVENTARIO_KEY = "neoGokuFitInventarioV1";
const STOCK_BAJO = 5;

const formulario = document.getElementById("form-inventario");
const tituloFormulario = document.getElementById("titulo-formulario");
const campoNombre = document.getElementById("nombre-item");
const campoCategoria = document.getElementById("categoria-item");
const campoCantidad = document.getElementById("cantidad-item");
const campoPrecio = document.getElementById("precio-item");
const campoFecha = document.getElementById("fecha-item");
const mensaje = document.getElementById("mensaje-inventario");
const botonGuardar = document.getElementById("guardar-item");
const botonCancelar = document.getElementById("cancelar-edicion");
const buscador = document.getElementById("buscar-item");
const filtroCategoria = document.getElementById("filtro-categoria");
const cuerpoTabla = document.getElementById("cuerpo-inventario");
const totalArticulos = document.getElementById("total-articulos");
const totalUnidades = document.getElementById("total-unidades");
const valorTotal = document.getElementById("valor-total");

let idEnEdicion = null;

function obtenerInventario() {
    try {
        const datos = JSON.parse(localStorage.getItem(INVENTARIO_KEY) || "[]");
        return Array.isArray(datos) ? datos : [];
    } catch (error) {
        return [];
    }
}

function guardarInventario(lista) {
    localStorage.setItem(INVENTARIO_KEY, JSON.stringify(lista));
}

function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CL");
}

function fechaDeHoy() {
    return new Date().toISOString().split("T")[0];
}

function mostrarMensaje(texto, esError) {
    mensaje.textContent = texto;
    mensaje.className = esError ? "mensaje-error" : "mensaje-exito";
}

function validarFormulario(datos) {
    if (datos.nombre.length < 3) {
        return "El nombre debe tener al menos 3 caracteres.";
    }

    const nombreRepetido = obtenerInventario().some(item =>
        item.nombre.toLowerCase() === datos.nombre.toLowerCase() && item.id !== idEnEdicion
    );
    if (nombreRepetido) {
        return "Ya existe un artículo con ese nombre.";
    }

    if (datos.categoria === "") {
        return "Selecciona una categoría.";
    }

    if (campoCantidad.value === "" || !Number.isInteger(datos.cantidad) || datos.cantidad < 0) {
        return "La cantidad debe ser un número entero igual o mayor a 0.";
    }

    if (campoPrecio.value === "" || !Number.isInteger(datos.precio) || datos.precio <= 0) {
        return "El precio debe ser un número entero mayor a 0.";
    }

    if (datos.fecha === "") {
        return "Indica la fecha de ingreso.";
    }

    if (datos.fecha > fechaDeHoy()) {
        return "La fecha de ingreso no puede ser futura.";
    }

    return "";
}

function guardarItem(event) {
    event.preventDefault();

    const datos = {
        nombre: campoNombre.value.trim(),
        categoria: campoCategoria.value,
        cantidad: Number(campoCantidad.value),
        precio: Number(campoPrecio.value),
        fecha: campoFecha.value
    };

    const error = validarFormulario(datos);
    if (error !== "") {
        mostrarMensaje(error, true);
        return;
    }

    const inventario = obtenerInventario();

    if (idEnEdicion) {
        const indice = inventario.findIndex(item => item.id === idEnEdicion);
        if (indice !== -1) {
            inventario[indice] = { id: idEnEdicion, ...datos };
        }
        mostrarMensaje("Artículo actualizado correctamente.", false);
    } else {
        inventario.push({ id: Date.now().toString(36), ...datos });
        mostrarMensaje("Artículo agregado correctamente.", false);
    }

    guardarInventario(inventario);
    salirDeEdicion();
    mostrarInventario();
}

function editarItem(id) {
    const item = obtenerInventario().find(articulo => articulo.id === id);
    if (!item) {
        return;
    }

    idEnEdicion = id;
    campoNombre.value = item.nombre;
    campoCategoria.value = item.categoria;
    campoCantidad.value = item.cantidad;
    campoPrecio.value = item.precio;
    campoFecha.value = item.fecha;
    tituloFormulario.textContent = "Editar artículo";
    botonGuardar.textContent = "Actualizar artículo";
    botonCancelar.hidden = false;
    mensaje.textContent = "";
    campoNombre.focus();
}

function eliminarItem(id) {
    const item = obtenerInventario().find(articulo => articulo.id === id);
    if (!item || !confirm("¿Eliminar \"" + item.nombre + "\" del inventario?")) {
        return;
    }

    guardarInventario(obtenerInventario().filter(articulo => articulo.id !== id));

    if (idEnEdicion === id) {
        salirDeEdicion();
    }

    mostrarMensaje("Artículo eliminado.", false);
    mostrarInventario();
}

function salirDeEdicion() {
    idEnEdicion = null;
    formulario.reset();
    campoFecha.value = fechaDeHoy();
    tituloFormulario.textContent = "Agregar artículo";
    botonGuardar.textContent = "Guardar artículo";
    botonCancelar.hidden = true;
}

function cancelarEdicion() {
    salirDeEdicion();
    mensaje.textContent = "";
}

function crearCelda(texto) {
    const celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
}

function crearBoton(texto, accion) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = texto;
    boton.addEventListener("click", accion);
    return boton;
}

function mostrarInventario() {
    cuerpoTabla.innerHTML = "";

    const texto = buscador.value.trim().toLowerCase();
    const categoria = filtroCategoria.value;
    const inventario = obtenerInventario();

    const filtrados = inventario.filter(item =>
        item.nombre.toLowerCase().includes(texto) &&
        (categoria === "" || item.categoria === categoria)
    );

    if (filtrados.length === 0) {
        const fila = document.createElement("tr");
        const celda = crearCelda(inventario.length === 0 ? "No hay artículos registrados." : "No se encontraron artículos.");
        celda.colSpan = 6;
        fila.appendChild(celda);
        cuerpoTabla.appendChild(fila);
    }

    filtrados.forEach(item => {
        const fila = document.createElement("tr");
        const celdaCantidad = crearCelda(item.cantidad);

        if (item.cantidad <= STOCK_BAJO) {
            celdaCantidad.className = "stock-bajo";
            celdaCantidad.title = "Stock bajo";
        }

        const celdaAcciones = document.createElement("td");
        celdaAcciones.className = "celda-acciones";
        celdaAcciones.append(
            crearBoton("Editar", () => editarItem(item.id)),
            crearBoton("Eliminar", () => eliminarItem(item.id))
        );

        fila.append(
            crearCelda(item.nombre),
            crearCelda(item.categoria),
            celdaCantidad,
            crearCelda(formatearPrecio(item.precio)),
            crearCelda(item.fecha),
            celdaAcciones
        );
        cuerpoTabla.appendChild(fila);
    });

    const unidades = inventario.reduce((suma, item) => suma + item.cantidad, 0);
    const valor = inventario.reduce((suma, item) => suma + item.cantidad * item.precio, 0);

    totalArticulos.textContent = "Artículos: " + inventario.length;
    totalUnidades.textContent = "Unidades: " + unidades;
    valorTotal.textContent = "Valor total: " + formatearPrecio(valor);
}

formulario.addEventListener("submit", guardarItem);
botonCancelar.addEventListener("click", cancelarEdicion);
buscador.addEventListener("input", mostrarInventario);
filtroCategoria.addEventListener("change", mostrarInventario);

campoFecha.max = fechaDeHoy();
campoFecha.value = fechaDeHoy();
mostrarInventario();
