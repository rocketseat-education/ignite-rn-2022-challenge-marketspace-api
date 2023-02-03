import dayjs from "dayjs";
import { Request, Response } from "express";

import { AppError } from "../utils/AppError";
import { GenerateRefreshToken } from "../providers/GenerateRefreshToken";
import { GenerateToken } from "../providers/GenerateToken";
import { prisma } from "../database";

export class UserRefreshToken {
  async create(request: Request, response: Response) {
    const { refresh_token } = request.body;

    if (!refresh_token) {
      throw new AppError("Informe o refresh token.");
    }

    const refreshToken = await prisma.refreshTokens.findFirst({
      where: {
        id: refresh_token
      }
    })

    if (!refreshToken) {
      throw new AppError("Refresh token não encontrado para este usuário.", 404);
    }

    const generateTokenProvider = new GenerateToken();
    const token = await generateTokenProvider.execute(refreshToken.user_id);

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expires_in));

    if (refreshTokenExpired) {
      throw new AppError("Refresh token expirado.", 401);
    }

    return response.json({ token });
  }
}