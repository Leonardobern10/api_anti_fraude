import jwt from 'jsonwebtoken';
import type { UserType } from '../modules/auth/model/schema/RegisterSchema';
import type Client from '../modules/auth/model/entity/Client';

const SECRET = 'super_secret_key';

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
