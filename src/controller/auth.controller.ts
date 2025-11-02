import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { generateToken } from '../utils/generateToken';
import { hashPlainText } from '../utils/hashPassword';

const users: User[] = [];


export async function Register(req: Request, res: Response) {
    try {
        const {
            name,
            email,
            password,
            role
        } = req.body;

        // check if email is already exists
        const userfound = users.find(u => u.email == email);
        if (userfound) {
            return res.status(400).json({ message: "Account already exist, please try loggin in" });
        }

        let newUser = new User({ id: String(Math.random()), email, name, password, role: role || 'member' })
        newUser.hashPassword();
        users.push(newUser);
        const token = generateToken({ id: newUser.id, email: newUser.email });
        return res.status(201).json({ token, user: { name: newUser.name, email: newUser.email, role: newUser.role } })
    } catch (error) {
        return res.status(500).json({ token: null, message: error })
    }
}

export async function Login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const userFound = users.find(user => user.email == email);
        if (!userFound) {
            return res.status(400).json({ message: "Incorrect login credentials." });
        }
        const validUser = await userFound?.comparePassword(password);
        if (!validUser) {
            return res.status(400).json({ message: "Incorrect login credentials." });
        }

        const token = generateToken({ id: userFound.id, email });
        return res.status(200).json({ token, user: { name: userFound.name, email: userFound.email, role: userFound.role } })

    } catch (error) {
        res.status(500).json({ token: null, message: error })
    }

}