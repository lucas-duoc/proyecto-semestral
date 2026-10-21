const formulario = document.getElementById("login-form");

function validate_login_submit(event) {
    event.preventDefault();

    const user_email = document.getElementById("email").value;
    const user_password = document.getElementById("password").value;

    if (user_email === "" || user_password === "") {
        alert("Campos no pueden estar vacíos. Intentar nuevamente.");
        return;
    }
    
    const user_list = get_user_list();
    const user_data = user_list.find(user => user.email === user_email);

    if (user_data === undefined) {
        alert("Correo inválido. Intentar nuevamente.");
        return;
    }

    if (user_data.password != user_password) {
        alert("Contraseña inválida. Intentar nuevamente");
        return;
    }

    window.location = "dashboard-users.html"
}

formulario.addEventListener("submit", validate_login_submit);