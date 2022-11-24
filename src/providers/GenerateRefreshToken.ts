import { prisma } from "../database";

const dayjs = require("dayjs");

export class GenerateRefreshToken {
  async execute(userId: string, newToken: string) {
    const expires_in = dayjs().add(1, "minute").unix();

    await prisma.usersTokens.create({
      data: {
        token: newToken,
        expires_in,
        user_id: userId
      }
    })
  }
}