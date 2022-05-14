/* eslint-disable prettier/prettier */
interface ICreateUserDto {
    name: string;
    password: string;
    email: string;
    id?: string;
    avatar?: string;
}

export { ICreateUserDto };
