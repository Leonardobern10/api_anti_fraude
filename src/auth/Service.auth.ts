import type RepositoryAuth from './Repository.auth';

export default class ServiceAuth {
    private repository: RepositoryAuth;

    constructor(repository: RepositoryAuth) {
        this.repository = repository;
    }

    public getUser(): string {
        return this.repository.getUser();
    }
}
