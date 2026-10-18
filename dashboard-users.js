const create_user_open_button = document.getElementById("modal-open-create")
const create_user_modal = document.getElementById("create-user-modal")
const create_user_close_button = document.getElementById("modal-create-button-close")
const create_user_save_button = document.getElementById("modal-create-button-save")

create_user_open_button.addEventListener("click", function(){
    create_user_modal.showModal();
})

create_user_close_button.addEventListener("click", function(){
    create_user_modal.close();
})

create_user_save_button.addEventListener("click", function() {
    const user_email = document.getElementById("user-email-create").value;
    const user_name = document.getElementById("user-name-create").value;
    const user_password = document.getElementById("user-password-create").value;

    if (user_name === "" || user_email === "" || user_password == "") {
        alert("Campos no pueden estar vacíos. Intentar nuevamente.")
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
    alert("Usuario creado exitosamente.")
    window.location.reload()
})

const modify_user_open_button = document.getElementById("modal-open-update")
const modify_user_modal = document.getElementById("modify-user-modal")
const modify_user_close_button = document.getElementById("modal-modify-button-close")
const modify_user_save_button = document.getElementById("modal-modify-button-save")

modify_user_open_button.addEventListener("click", function(){
    modify_user_modal.showModal();
})

modify_user_close_button.addEventListener("click", function(){
    modify_user_modal.close();
})

modify_user_save_button.addEventListener("click", function(){
    const user_email = document.getElementById("user-email-modify").value;
    const user_new_email = document.getElementById("user-new-email-modify").value;
    const user_name = document.getElementById("user-name-modify").value;
    const user_password = document.getElementById("user-password-modify").value;

    const user_list = get_user_list();
    const user_exists = user_list.some(user => user.email === user_email);
    const new_email_exists = user_list.some(user => user.email === user_new_email);

    if (!user_exists) {
        alert("Usuario no registrado. Intentar nuevamente");
        return;
    }

    if (new_email_exists) {
        alert("Nuevo correo electrónico inválido. Intentar nuevamente");
        return;
    }

    const modified_user = {
        email: user_email,
        new_email: user_new_email,
        name: user_name,
        password: user_password
    }

    update_user_in_database(modified_user)
    alert("Usuario modificado exitosamente.")
    window.location.reload()

})

const delete_user_open_button = document.getElementById("modal-open-delete")
const delete_user_modal = document.getElementById("delete-user-modal")
const delete_user_close_button = document.getElementById("modal-delete-button-close")
const delete_user_save_button = document.getElementById("modal-delete-button-save")

delete_user_open_button.addEventListener("click", function(){
    delete_user_modal.showModal();
})

delete_user_close_button.addEventListener("click", function(){
    delete_user_modal.close();
})

delete_user_save_button.addEventListener("click", function() {
    const user_email = document.getElementById("user-email-delete").value;
    const user_list = get_user_list();
    const user_exists = user_list.some(user => user.email === user_email);

    if (!user_exists) {
        alert("Usuario no registrado. Intentar nuevamente");
        return;
    }
    delete_user_in_database(user_email)
    alert("Usuario eliminado exitosamente.")
    window.location.reload()
})

function create_table() {
    const user_list = get_user_list();
    const table_body = document.getElementById("users-table-body");
    
    table_body.innerHTML = "";

    if (user_list.length === 0) {
        table_body.innerHTML = `
            <tr> 
                <td>No hay usuarios registrados. </td>
            </tr>`;
        return;
    }

    user_list.forEach(user => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.creation_date}</td>
        `;

        table_body.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", create_table);