import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { ListCategoriesController } from "./ListCategoryController";

const listCategoriesRepository = null;
const listCategoriesUseCase = new ListCategoriesUseCase(
  listCategoriesRepository
);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export { listCategoriesController };
