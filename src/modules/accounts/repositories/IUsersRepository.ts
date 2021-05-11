import { ICreateUserDto } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create(createUserDto: ICreateUserDto): Promise<void>;
}

export { IUsersRepository };
