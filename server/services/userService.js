import db from '../utils/db.js';
import bcrypt from 'bcrypt';

export const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await db
        .from('user')
        .insert({ username, email, password: hashedPassword });

    if (error) throw error;
};

export const verifyPassword = async (identifier, password) => {
    const user = await getUserByIdentifier(identifier);

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new Error('Invalid password');
}

export const getUserIdByIdentifier = async (identifier) => {
    const { id } = await getUserByIdentifier(identifier);
    return id;
};

const getUserByIdentifier = async (identifier) => {
    const { data, error } = await db
        .from('user')
        .select('*')
        .or(`username.eq.${identifier},email.eq.${identifier}`)
        .single();

    if (error) throw new Error('User not found');
    return data;
};
