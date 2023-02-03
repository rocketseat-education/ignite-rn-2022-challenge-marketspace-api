import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../utils/AppError";
import { authConfig } from "../configs/auth";

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    if (typeof user_id !== 'string') {
      throw new AppError("Falha ao verificar JWT Token", 401)
    }

    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError("token.invalid", 401);
  }
}