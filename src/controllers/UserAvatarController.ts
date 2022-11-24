import { Request, Response } from "express";

import { prisma } from "../database";

import { DiskStorage } from "../providers/DiskStorage";

export class UserAvatarController {
  async create(request: Request, response: Response) {
    const user_id = request.user.id;
    const avatarFilename = request.file?.filename as string;

    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(avatarFilename);

    await prisma.users.update({
      where: {
        id: user_id
      },
      data: {
        avatar: filename,
        updated_at: new Date()
      }
    })

    return response.status(201).json();
  }
}