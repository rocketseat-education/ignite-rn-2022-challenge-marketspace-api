import { Router } from "express";

import { ProductsController } from "../controllers/ProductsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const productsRoutes = Router();

const productsController = new ProductsController();

productsRoutes.use(ensureAuthenticated);

productsRoutes.get("/", productsController.index);
productsRoutes.get("/:id", productsController.show);
productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id", productsController.update);
productsRoutes.patch("/:id", productsController.patch);
productsRoutes.delete("/:id", productsController.delete);