import { PrismaClient } from "@PrismClient";
export const db = () => new PrismaClient({ log: ["error", "info"] });
