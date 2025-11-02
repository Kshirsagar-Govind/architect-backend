import bcrypt from 'bcryptjs';
export async function hashPlainText(text:string):Promise<string> {
    let salt = await bcrypt.genSalt(5);
    return await bcrypt.hash(text,salt);
}