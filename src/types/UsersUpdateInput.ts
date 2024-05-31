import { Static, Type } from "@sinclair/typebox";

export const UsersUpdateInput = Type.Object({
  fisrt_name: Type.String(),
  last_name: Type.String()
});

export type UsersInputType = Static<typeof UsersUpdateInput>;
