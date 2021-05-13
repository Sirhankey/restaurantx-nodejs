import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUseAvatar/updateUserAvatarController";

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarUseController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarUseController.handle
);

export { usersRoutes };
