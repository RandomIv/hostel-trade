import db from '../utils/db.js';
import bcrypt from 'bcrypt';

export const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await db
        .from('user')
        .insert({ username, email, password: hashedPassword });

    if (error) throw error;
};
