import { getRepository, Repository, SelectQueryBuilder } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { buildQuery, QueryOperation } from "@utils/buildQuery";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    });
    return car;
  }

  async findCarsAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("cars")
      .where("available = :available", { available: true });

    buildQuery<Car>(
      [
        { property: "brand", value: brand, operation: QueryOperation.AND },
        {
          property: "category_id",
          value: category_id,
          operation: QueryOperation.AND,
        },
        { property: "name", value: name, operation: QueryOperation.AND },
      ],
      carsQuery
    );

    // if (brand) {
    //   carsQuery.andWhere("cars.brand = :brand", { brand });
    // }
    // if (name) {
    //   carsQuery.andWhere("cars.name = :name", { name });
    // }
    // if (category_id) {
    //   carsQuery.andWhere("cars.category_id = :category_id", { category_id });
    // }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);
    return car;
  }
}

export { CarsRepository };
