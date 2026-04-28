import jwt from 'jsonwebtoken';
import type Client from '../modules/auth/model/entity/Client.js';

const SECRET = process.env.JWT_SECRET!;

export default class JwtUtils {
    static generate(client: Client): string {
        return jwt.sign({ email: client.email, role: client.role }, SECRET, {
            expiresIn: '1h',
        });
    }

    static verify(token: string) {
        return jwt.verify(token, SECRET);
    }
}
