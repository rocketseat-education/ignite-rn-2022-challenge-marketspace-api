import { prisma } from "../database";
import dayjs from "dayjs";

export class GenerateRefreshToken {
  async execute(userId: string) {
    const oldRefreshToken = await prisma.refreshTokens.findFirst({
      where: {
        user_id: userId
      }
    });

    if (oldRefreshToken?.id) {
      await prisma.refreshTokens.delete({
        where: {
          id: oldRefreshToken.id
        }
      });
    }

    const expires_in = dayjs().add(15, "m").unix();

    const refreshToken = await prisma.refreshTokens.create({
      data: {
        expires_in,
        user_id: userId
      }
    })

    return refreshToken;
  }
}