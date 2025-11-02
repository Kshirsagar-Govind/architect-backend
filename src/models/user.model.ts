import bcrypt from 'bcryptjs';
import { hashPlainText } from '../utils/hashPassword';

// creating mkodel in typescript
// first we need interface to declare the schema fields
// we need a class to create schema using that interface



export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: "admin" | "manager" | "member"
}

export class User implements IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'manager' | 'member';

    constructor(data: IUser) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role;
    }

    // hashing password
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
    // comparing password
    async comparePassword(plain: string): Promise<boolean> {
        return bcrypt.compare(plain, this.password);
    }

}