import db from '../config/dbConfig.js';

export const getUserById = async (id) => {
    return db
        .from('user')
        .select(
            'id, username, first_name, last_name, email, avatar_img, phone_number, created_at, hostel(*)',
        )
        .eq('id', id)
        .single();
};
export const updateUserById = async (id, data) => {
    return db.from('user').update(data).eq('id', id);
};

export const deleteUserById = async (id) => {
    return db.from('user').delete().eq('id', id);
};
