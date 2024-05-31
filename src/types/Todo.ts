import { Static, Type } from "@sinclair/typebox";

export const Todo = Type.Object({
  id: Type.String(),
  titel: Type.String(),
  description: Type.String(),
  status: Type.Optional(Type.Number()),
  create_date: Type.Optional(Type.String()),
  update_date: Type.Optional(Type.String())
});

export type TodoType = Static<typeof Todo>;
