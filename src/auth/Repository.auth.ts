import { DBAuth } from './DB.auth';
import type User from './User';

export default class RepositoryAuth {
    private db: Array<User>;

    constructor(db: Array<User>) {
        this.db = db;
    }

    public getUser(): string {
        return 'Até o repository!';
    }
}
