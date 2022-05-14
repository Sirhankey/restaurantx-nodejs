/* eslint-disable prettier/prettier */

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";
import { classToClass } from "class-transformer";

class UserMap {
    static toDTO({
        email,
        name,
        id,
        avatar,
        avatar_url
    }: User): IUserResponseDTO {
        const user = classToClass({
            email,
            name,
            id,
            avatar,
            avatar_url
        });
        return user;
    }
}

export { UserMap };