import { ICreateUserDto } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create(createUserDto: ICreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
