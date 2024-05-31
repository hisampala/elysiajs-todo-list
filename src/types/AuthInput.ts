import { Static, Type } from "@sinclair/typebox";

export const AuthInput = Type.Object({
  username: Type.String(),
  password: Type.String()
});

export type AuthInputType = Static<typeof AuthInput>;
