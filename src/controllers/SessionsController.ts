import { compare } from "bcryptjs";
import { Request, Response } from "express";

import { AppError } from "../utils/AppError";

import { GenerateRefreshToken } from "../providers/GenerateRefreshToken";
import { GenerateToken } from "../providers/GenerateToken";

import { prisma } from "../database";

export class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await prisma.users.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 404);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 404);
    }

    const generateTokenProvider = new GenerateToken();
    const token = await generateTokenProvider.execute(user.id);

    const oldUserToken = await prisma.usersTokens.findUnique({
      where: {
        user_id: user.id
      }
    })

    if (oldUserToken) {
      await prisma.usersTokens.delete({
        where: {
          user_id: user.id
        }
      })
    }

    const generateRefreshToken = new GenerateRefreshToken();
    generateRefreshToken.execute(user.id, token);

    const { password: removeField, ...rest } = user;

    response.status(201).json({ token, user: { ...rest } });
  }
}