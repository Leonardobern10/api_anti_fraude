import type AuthRepository from '@modules/auth/repository/AuthRepository';
import type { IUserQuery } from '@modules/domain/checkout/InterfaceUserQuery';
import { UserDTO } from '../dto/UserDTO';

export default class UserQueryLocal implements IUserQuery {
    constructor(private authRepository: AuthRepository) {}

    async findById(userId: string): Promise<UserDTO> {
        const user = await this.authRepository.getUser(userId);
        if (!user) throw new Error('User not found');
        return new UserDTO(user.email, user.role, 0, 0);
    }
}
