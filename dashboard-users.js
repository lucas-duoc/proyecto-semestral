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