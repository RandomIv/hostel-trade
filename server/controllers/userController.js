import { registerUser } from '../services/userService.js';

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        await registerUser(username, email, password);

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res) => {

}

export const logout = async (req, res) => {

}
