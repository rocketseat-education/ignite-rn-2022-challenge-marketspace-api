import { Router } from "express";

import { SessionsController } from "../controllers/SessionsController";
import { UserRefreshToken } from "../controllers/UserRefreshToken";

const sessionsController = new SessionsController();
const userRefreshToken = new UserRefreshToken();

export const sessionsRoutes = Router();

sessionsRoutes.post("/", sessionsController.create);
sessionsRoutes.post("/refresh-token", userRefreshToken.create);