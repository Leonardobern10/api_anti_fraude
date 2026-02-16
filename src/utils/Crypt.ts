import bcrypt from 'bcrypt';

export default class Crypt {
    static async encrypt(text: string, salt: number = 10): Promise<string> {
        return await bcrypt.hash(text, salt);
    }
    static async compare(text: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(text, hash);
    }
}
