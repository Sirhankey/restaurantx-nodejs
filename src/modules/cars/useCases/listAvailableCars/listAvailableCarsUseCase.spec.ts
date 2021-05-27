import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("List Available Cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepository.create({
      name: "Car 1",
      brand: "Fiat",
      category_id: "1",
      daily_rate: 50,
      description: "Fiat Argo 2021",
      fine_amount: 100,
      license_plate: "ABC-1234",
    });
    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepository.create({
      name: "Car 1",
      brand: "Fiat",
      category_id: "1",
      daily_rate: 50,
      description: "Fiat Argo 2021",
      fine_amount: 100,
      license_plate: "ABC-1234",
    });
    const cars = await listCarsUseCase.execute({
      brand: "Fiat",
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepository.create({
      name: "Car 3",
      brand: "Audi",
      category_id: "1",
      daily_rate: 50,
      description: "Audi A3",
      fine_amount: 100,
      license_plate: "ABC-1234",
    });
    const cars = await listCarsUseCase.execute({
      name: "Car 3",
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepository.create({
      name: "Car 1",
      brand: "Fiat",
      category_id: "1234",
      daily_rate: 50,
      description: "Fiat Argo 2021",
      fine_amount: 100,
      license_plate: "ABC-1234",
    });
    const cars = await listCarsUseCase.execute({
      category_id: "1234",
    });
    expect(cars).toEqual([car]);
  });
});
