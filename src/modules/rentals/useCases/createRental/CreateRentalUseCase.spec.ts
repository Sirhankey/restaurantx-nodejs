import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
    });

    it("should be able create a rental", async () => {
        const rental = await createRentalUseCase.execute({
            car_id: "123",
            user_id: "321",
            expected_return_date: new Date()
        });

        expect(rental).toHaveProperty("id");
    });

    it("should not be able create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "1234",
                user_id: "321",
                expected_return_date: new Date()
            });

            const rental = await createRentalUseCase.execute({
                car_id: "12345",
                user_id: "321",
                expected_return_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "123",
                user_id: "12345",
                expected_return_date: new Date()
            });

            const rental = await createRentalUseCase.execute({
                car_id: "123",
                user_id: "123456",
                expected_return_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});