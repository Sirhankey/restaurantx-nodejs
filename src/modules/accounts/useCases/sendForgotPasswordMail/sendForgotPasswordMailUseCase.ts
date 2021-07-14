import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { v4 as uuidv4 } from 'uuid';
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase  {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private etherealMailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const DEFAULT_EXPIRES_IN_HOURS = 3;
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User does not exists!");
        }

        const token = uuidv4();

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date: this.dayjsDateProvider.addHours(DEFAULT_EXPIRES_IN_HOURS)
        });

        await this.etherealMailProvider.sendMail(email, "Recuperação de senha", `o link para reset é: ${token}`);
    }
}

export { SendForgotPasswordMailUseCase }