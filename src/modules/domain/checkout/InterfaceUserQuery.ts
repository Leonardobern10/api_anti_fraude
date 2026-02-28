import type { UserDTO } from '../auth/dto/UserDTO';

export interface IUserQuery {
    findById(userId: string): Promise<UserDTO>;
}
