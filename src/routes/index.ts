import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { sessionsRoutes } from "./sessions.routes";
import { productsRoutes } from "./products.routes";
import { productImagesRoutes } from "./productsImages.routes";

export const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

routes.use("/products/images", productImagesRoutes);
routes.use("/products", productsRoutes);