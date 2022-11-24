import { Router } from "express";
import multer from "multer";

import { ProductImagesController } from "../controllers/ProductImagesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { MULTER } from "../configs/upload";

export const productImagesRoutes = Router();

const productImagesController = new ProductImagesController();

const upload = multer(MULTER);

productImagesRoutes.use(ensureAuthenticated);

productImagesRoutes.post("/", upload.array("images"), productImagesController.create);
productImagesRoutes.delete("/", productImagesController.delete);