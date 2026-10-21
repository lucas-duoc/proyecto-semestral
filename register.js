const formulario = document.getElementById("register-form");

function validate_register_submit(event) {
    event.preventDefault();

    const user_name = document.getElementById("name").value;
    const user_email = document.getElementById("email").value;
    const user_password = document.getElementById("password").value;
    const user_confirm_password = document.getElementById("confirm-password").value;

    if (user_name === "" || user_email === "" || user_password == "" ||
        user_confirm_password === "") {
            alert("Campos no pueden estar vacíos. Intentar nuevamente.");
            return;
    }

    if (user_password != user_confirm_password) {
        alert("Contraseñas no son iguales. Intentar nuevamente.");
        return;
    }

    const user_list = get_user_list();
    const user_exists = user_list.some(user => user.email === user_email);

    if (user_exists) {
        alert("Correo electrónico inválido. Intentar nuevamente.");
        return;
    }

    const new_user = {
        name: user_name,
        email: user_email,
        password: user_password,
        creation_date: new Date(),
    }

    add_user_to_database(new_user);

    window.location = "login.html"
}

formulario.addEventListener("submit", validate_register_submit);