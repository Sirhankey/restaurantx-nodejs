/* eslint-disable prettier/prettier */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CraeteUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const createUserCase = container.resolve(CreateUserUseCase);
        await createUserCase.execute({
            name,
            email,
            password,
        });
        return response.status(201).send();
    }
}

export { CreateUserController };
