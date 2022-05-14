import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateClientUseCase } from "./CreateClientUseCase";

class CreateClientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { client_id, expected_return_date } = request.body;
        const { id } = request.user;
        const createClientUseCase = container.resolve(CreateClientUseCase);
        const rental = await createClientUseCase.execute({
            car_id,
            expected_return_date,
            user_id: id
        });
        return response.status(201).json(rental);
    }
}

export { CreateClientController }