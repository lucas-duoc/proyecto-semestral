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
    
})

const modify_user_open_button = document.getElementById("modal-open-update")
const modify_user_modal = document.getElementById("modify-user-modal")
const modify_user_close_button = document.getElementById("modal-modify-button-close")

modify_user_open_button.addEventListener("click", function(){
    modify_user_modal.showModal();
})

modify_user_close_button.addEventListener("click", function(){
    modify_user_modal.close();
})

const delete_user_open_button = document.getElementById("modal-open-delete")
const delete_user_modal = document.getElementById("delete-user-modal")
const delete_user_close_button = document.getElementById("modal-delete-button-close")

delete_user_open_button.addEventListener("click", function(){
    delete_user_modal.showModal();
})

delete_user_close_button.addEventListener("click", function(){
    delete_user_modal.close();
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