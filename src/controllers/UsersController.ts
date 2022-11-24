import { hash } from "bcryptjs";
import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError";
import { prisma } from "../database";
import { DiskStorage } from "../providers/DiskStorage";

export class UsersController {
  async show(request: Request, response: Response) {
    const userId = request.user.id

    const user = await prisma.users.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        avatar: true,
        name: true,
        email: true,
        tel: true
      }
    })

    if (!user) {
      throw new AppError('O usuário não foi encontrado.', 404)
    }

    return response.json(user)
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const { name, email, password, tel } = request.body;
    const avatarFile = request.file;
    const diskStorage = new DiskStorage();

    if (!avatarFile) {
      throw new AppError("É obrigatório o envio de uma imagem.")
    }

    if (!name || !email || !password || !tel) {
      await diskStorage.deleteFile(avatarFile.path)
      throw new AppError("Informe todos os campos de texto (nome, email, telefone e senha).");
    }
    
    const checkUserEmailExists = await prisma.users.findUnique({
      where: {
        email
      }
    })

    if (checkUserEmailExists) {
      await diskStorage.deleteFile(avatarFile.path)
      throw new AppError("Este e-mail já está em uso.", 401);
    }

    const checkUserTelExists = await prisma.users.findUnique({
      where: {
        tel
      }
    })

    if (checkUserTelExists) {
      await diskStorage.deleteFile(avatarFile.path)
      throw new AppError("Este telefone já está em uso.", 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        tel,
        password: hashedPassword
      }
    });

    request.user = {
      id: user.id,
    };

    return next();
  }
}