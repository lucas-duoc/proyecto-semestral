const user_db_name = "userLocalStorageXD";

function get_user_list() {
    const user_db_storage =  localStorage.getItem(user_db_name);
    
    if (!user_db_storage) {
        return [];
    }
    const user_list = JSON.parse(user_db_storage);
    return user_list;
}

function add_user_to_database(user_data) {
    const user_list = get_user_list();
    user_list.push(user_data);
    localStorage.setItem(user_db_name, JSON.stringify(user_list));
}

function update_user_in_database(updated_user_data) {
    const user_list = get_user_list();
    const user_index = user_list.findIndex(user => user.email === updated_user_data.email);

    if (user_index === -1) {
        return;
    }

    if (updated_user_data.new_email !== "") {
        user_list[user_index].email = updated_user_data.new_email;
    }

    if (updated_user_data.name !== "") {
        user_list[user_index].name = updated_user_data.name;
    }

    if (updated_user_data.password !== "") {
        user_list[user_index].password = updated_user_data.password;
    }

    localStorage.setItem(user_db_name, JSON.stringify(user_list));
}

function delete_user_in_database(user_email) {
    const user_list = get_user_list();
    const filtered_user_list = user_list.filter(user => user.email !== user_email);
    localStorage.setItem(user_db_name, JSON.stringify(filtered_user_list));
}