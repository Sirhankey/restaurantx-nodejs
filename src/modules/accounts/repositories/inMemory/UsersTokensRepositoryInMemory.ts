import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    users: UserTokens[] = [];

    async create({
        expires_date,
        refresh_token,
        user_id
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const user = new UserTokens();
        Object.assign(user, {
            expires_date,
            refresh_token,
            user_id
        });
        this.users.push(user);
        return user;
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        return this.users.find(user => user.user_id === user_id && user.refresh_token === refresh_token);
    }

    async deleteById(id: string): Promise<void> {
        const user = this.users.find(user => user.id === id);
        this.users.splice(this.users.indexOf(user), 1);
    }

    async findByRefreshToken(token: string): Promise<UserTokens> {
        return this.users.find(user => user.refresh_token === token);
    }
}

export { UsersTokensRepositoryInMemory };
