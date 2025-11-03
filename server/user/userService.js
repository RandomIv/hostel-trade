import { deleteUserById, getUserById, updateUserById } from './userDAL.js';
import bcrypt from 'bcrypt';

export const fetchUser = async (id, next) => {
    const { data, error } = await getUserById(id);
    if (error) return next(error);
    return data;
};

export const updateUser = async (id, dataToUpdate, next) => {
    if (dataToUpdate.password) {
        dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
    }

    const { error } = await updateUserById(id, dataToUpdate);
    if (error) return next(error);
};

export const deleteUser = async (id, next) => {
    const { error } = deleteUserById(id);
    if (error) return next(error);
};
