import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepository = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dayjsDateProvider, carsRepository);
    });

    it("should be able create a rental", async () => {
        const rental = await createRentalUseCase.execute({
            car_id: "123",
            user_id: "321",
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id");
    });

    it("should not be able create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "1234",
                user_id: "321",
                expected_return_date: dayAdd24Hours
            });

            const rental = await createRentalUseCase.execute({
                car_id: "12345",
                user_id: "321",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "123",
                user_id: "12345",
                expected_return_date: dayAdd24Hours
            });

            const rental = await createRentalUseCase.execute({
                car_id: "123",
                user_id: "123456",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able create a new rental with invalid return time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "123",
                user_id: "12345",
                expected_return_date: dayjs().toDate()
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});