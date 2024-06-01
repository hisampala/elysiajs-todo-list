import { z } from "zod";
const TEnv = z.object({
  SECERT_KEY: z.string()
});
export const env = () => TEnv.parse(process.env);
