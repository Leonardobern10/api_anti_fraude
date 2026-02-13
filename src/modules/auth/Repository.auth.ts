import { DBAuth } from './DB.auth';
import type User from './User';

export default class AuthRepository {
    private db: Array<User>;

    constructor(db: Array<User>) {
        this.db = db;
    }

    public test(): string {
        return 'Até o repository!';
    }

    public getUser(email: string): User | null {
        const user = this.db.find((el) => el.getEmail() === email);
        if (!user) return null;
        return user;
    }

    public save(user: User): User {
        this.db.push(user);
        return user;
    }
}
