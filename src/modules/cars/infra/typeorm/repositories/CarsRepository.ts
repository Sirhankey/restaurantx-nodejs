import { getRepository, Repository, SelectQueryBuilder } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

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
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
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

    this.buildQuery<Car>(
      [
        { param: "brand", value: brand },
        { param: "category_id", value: category_id },
        { param: "name", value: name },
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

  private buildQuery<T>(arry: any[], query: SelectQueryBuilder<T>): void {
    arry.forEach((item) => {
      if (item.param && item.value) {
        query.andWhere(`${item.param} = :${item.param}`, {
          [item.param]: item.value,
        });
      }
    });
  }
}

export { CarsRepository };
