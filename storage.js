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