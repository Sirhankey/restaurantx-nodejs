import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCase } from "./resetPasswordUserUseCase";

class ResetPasswordUserController {
    async handle(request: Request, response?: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;
        const resetPasswordUserController = container.resolve(ResetPasswordUserUseCase);
        await resetPasswordUserController.execute({ token: String(token), password });
        return response.json();
    }
}

export { ResetPasswordUserController }
