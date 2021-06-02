import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ISpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create({ name, description }: ISpecificationDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, {
            description,
            name
        });
        this.specifications.push(specification);
        return specification;
    }
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(specification => specification.name === name);
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = this.specifications.filter(specification => ids.includes(specification.id));
        return specifications;
    }
}

export { SpecificationsRepositoryInMemory };
