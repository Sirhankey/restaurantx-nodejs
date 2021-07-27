import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/createCarSpecificationController";
import { UploadCarImageController } from "@modules/cars/uploadCarImage/UploadCarImageController";

import multer from "multer";
import uploadConfig from "@config/upload";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailabeCarsController = new ListAvailableCarsController();
const createCarSpecificationCarController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const uploadCarImages = multer(uploadConfig);

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);
carsRoutes.get("/available", listAvailabeCarsController.handle);
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationCarController.handle);
carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, uploadCarImages.array("images"), uploadCarImageController.handle);

export { carsRoutes };
