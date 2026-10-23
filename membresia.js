const MEMBRESIA_KEY = "neoGokuFitMembresiasV1";
const formularioMembresia = document.getElementById("form-membresia");

function guardarMembresia(event) {
    event.preventDefault();

    const emailUsuario = document.getElementById("buscar-usuario-membresia").value;
    const tipoPlan = document.getElementById("tipo-plan").value;
    const fechaInicio = document.getElementById("fecha-inicio").value;

    const user_list = get_user_list(); // Función que viene de storage.js
    const usuarioExiste = user_list.some(user => user.email === emailUsuario);

    if (!usuarioExiste) {
        alert("El correo ingresado no pertenece a ningún usuario registrado. Verifique en la sección de Usuarios.");
        return;
    }

    let fechaVencimiento = new Date(fechaInicio);
    if (tipoPlan === "mensual") {
        fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 1);
    } else if (tipoPlan === "trimestral") {
        fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 3);
    } else if (tipoPlan === "anual") {
        fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + 1);
    }

    const nuevaMembresia = {
        id: Date.now().toString(36), // ID único
        email: emailUsuario,
        plan: tipoPlan,
        fecha_inicio: fechaInicio,
        fecha_vencimiento: fechaVencimiento.toISOString().split('T')[0] 
    };

    try {
        const membresiasGuardadas = JSON.parse(localStorage.getItem(MEMBRESIA_KEY) || "[]");
        membresiasGuardadas.push(nuevaMembresia);
        localStorage.setItem(MEMBRESIA_KEY, JSON.stringify(membresiasGuardadas));
        
        alert(`Membresía guardada con éxito. Vence el: ${nuevaMembresia.fecha_vencimiento}`);
        formularioMembresia.reset();
    } catch (error) {
        alert("Ocurrió un error al guardar la membresía.");
    }
}

formularioMembresia.addEventListener("submit", guardarMembresia);