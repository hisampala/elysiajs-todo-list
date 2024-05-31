import { PrismaClient } from "@prisma/client";
export const db = () => {
  return new PrismaClient({ log: ["error", "info"] });
};
