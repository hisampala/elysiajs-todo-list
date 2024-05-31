import { Static, Type } from "@sinclair/typebox";

export const TodoInput = Type.Object({
  id: Type.String(),
  titel: Type.String(),
  description: Type.String(),
  status: Type.Optional(Type.Number()),
  create_date: Type.Optional(Type.String()),
  update_date: Type.Optional(Type.String())
});

export type TodoInputType = Static<typeof TodoInput>;
