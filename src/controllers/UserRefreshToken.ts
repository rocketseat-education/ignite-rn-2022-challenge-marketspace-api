import dayjs from "dayjs";
import { Request, Response } from "express";

import { AppError } from "../utils/AppError";
import { GenerateRefreshToken } from "../providers/GenerateRefreshToken";
import { GenerateToken } from "../providers/GenerateToken";
import { prisma } from "../database";

export class UserRefreshToken {
  async create(request: Request, response: Response) {
    const { token } = request.body;

    if (!token) {
      throw new AppError("Informe o token de autenticação.");
    }

    const userToken = await prisma.usersTokens.findFirst({
      where: {
        token
      }
    })

    if (!userToken) {
      throw new AppError("Refresh token não encontrado para este usuário.", 404);
    }

    const generateTokenProvider = new GenerateToken();
    const refreshToken = await generateTokenProvider.execute(userToken.user_id);

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(userToken.expires_in));

    if (refreshTokenExpired) {
      await prisma.usersTokens.delete({
        where: {
          user_id: userToken.user_id
        }
      })

      const generateRefreshToken = new GenerateRefreshToken();
      await generateRefreshToken.execute(userToken.user_id, refreshToken);

      return response.json({ token: refreshToken });
    }

    return response.json({ token });
  }
}