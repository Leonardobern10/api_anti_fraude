import type { UserDTO } from '../auth/dto/UserDTO.js';

export interface IUserQuery {
    findById(userId: string): Promise<UserDTO>;
}
