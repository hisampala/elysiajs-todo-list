import { Static, Type } from "@sinclair/typebox";

export const Users = Type.Object({
  id: Type.String(),
  username: Type.String(),
  password: Type.String(),
  fisrt_name: Type.String(),
  last_name: Type.String(),
  refresh_token: Type.Optional(Type.String()),
  create_date: Type.Optional(Type.String()),
  update_date: Type.Optional(Type.String())
});

export type UsersType = Static<typeof Users>;
