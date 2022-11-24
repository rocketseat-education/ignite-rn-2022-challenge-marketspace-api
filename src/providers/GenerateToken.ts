import { sign } from "jsonwebtoken";
import { authConfig } from "../configs/auth";

export class GenerateToken {
  async execute(userId: string) {
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userId,
      expiresIn
    });

    return token;
  }
}