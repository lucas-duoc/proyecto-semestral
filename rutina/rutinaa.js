// Capturamos el formulario
const formulario = document.getElementById("formularioRutina");

// Capturamos la tabla
const tablaRutinas = document.getElementById("tablaRutinas");

// Recuperamos las rutinas guardadas en localStorage
let rutinas = JSON.parse(localStorage.getItem("rutinas")) || [];

// Mostrar las rutinas que ya existen
mostrarRutinas();

// Escuchar cuando se envía el formulario
formulario.addEventListener("submit", function(event) {

    // Evita que la página se recargue
    event.preventDefault();

    // Obtener valores de los inputs
    const nombreRutina =
        document.getElementById("nombreRutina").value.trim();

    const ejercicio =
        document.getElementById("ejercicio").value.trim();

    const series =
        document.getElementById("series").value;

    const repeticiones =
        document.getElementById("repeticiones").value;

    // Validar campos
    if (nombreRutina === "") {
        alert("Debe ingresar el nombre de la rutina");
        return;
    }

    if (ejercicio === "") {
        alert("Debe ingresar un ejercicio");
        return;
    }

    if (series === "") {
        alert("Debe ingresar las series");
        return;
    }

    if (repeticiones === "") {
        alert("Debe ingresar las repeticiones");
        return;
    }

    // Crear objeto rutina
    const rutina = {
        nombre: nombreRutina,
        ejercicio: ejercicio,
        series: series,
        repeticiones: repeticiones
    };

    // Agregar rutina al array
    rutinas.push(rutina);

    // Guardar array en localStorage
    localStorage.setItem(
        "rutinas",
        JSON.stringify(rutinas)
    );

    // Mostrar nuevamente la tabla
    mostrarRutinas();

    // Limpiar formulario
    formulario.reset();

    alert("Rutina agregada correctamente");
});

// FUNCIÓN PARA MOSTRAR LAS RUTINAS
function mostrarRutinas() {

    // Limpiamos la tabla
    tablaRutinas.innerHTML = "";

    // Recorremos el array
    rutinas.forEach(function(rutina, indice) {

        tablaRutinas.innerHTML += `
            <tr>
                <td>${rutina.nombre}</td>
                <td>${rutina.ejercicio}</td>
                <td>${rutina.series}</td>
                <td>${rutina.repeticiones}</td>
                <td>
                    <button
                        class="botonEliminar"
                        onclick="eliminarRutina(${indice})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

// FUNCIÓN PARA ELIMINAR
function eliminarRutina(indice) {

    rutinas.splice(indice, 1);

    localStorage.setItem(
        "rutinas",
        JSON.stringify(rutinas)
    );

    mostrarRutinas();
}
