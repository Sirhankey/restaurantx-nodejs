import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { inject, injectable } from "tsyringe";

@injectable()
class ProfileUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async execute(userId: string): Promise<IUserResponseDTO> {
        const user = await this.usersRepository.findById(userId);
        return UserMap.toDTO(user);
    }
}

export { ProfileUserUseCase };