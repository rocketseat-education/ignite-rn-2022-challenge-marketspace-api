import { Router } from "express";
import multer from "multer";

import { MULTER } from "../configs/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { UsersController } from "../controllers/UsersController";
import { UserAvatarController } from "../controllers/UserAvatarController";
import { UserProductsController } from "../controllers/UserProductsController";

export const usersRoutes = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userProductsController = new UserProductsController();

const upload = multer(MULTER);

usersRoutes.post("/", upload.single("avatar"), usersController.create, userAvatarController.create);
usersRoutes.get("/me", ensureAuthenticated, usersController.show);
usersRoutes.get("/products", ensureAuthenticated, userProductsController.index);