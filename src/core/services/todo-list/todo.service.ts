import { Todo } from "@prisma/client";
import { Effect } from "effect";

import { TodoInputType } from "../../../types";
import * as connections from "../connections";
import * as errors from "./error";
const create_item = (item: TodoInputType) => {
  return Effect.tryPromise({
    try: async () => await connections.db().todo.create({ data: item }),
    catch: (error: unknown) => new errors.create_item_todo_error((error as Error).message)
  });
};
const update_item = (id: string, item: Partial<TodoInputType>) => {
  return Effect.tryPromise({
    try: async () => await connections.db().todo.update({ where: { id }, data: item }),
    catch: (error: unknown) => new errors.update_item_todo_error((error as Error).message)
  });
};
const delete_item = (id: string) => {
  return Effect.tryPromise({
    try: async () => await connections.db().todo.delete({ where: { id } }),
    catch: (error: unknown) => new errors.delete_item_todo_error((error as Error).message)
  });
};
const get_all_item = () => {
  return Effect.tryPromise({
    try: async () => await connections.db().todo.findMany(),
    catch: (error: unknown) => new errors.get_all_item_todo_error((error as Error).message)
  });
};
const get_item_by_id = (id: string) => {
  return Effect.tryPromise({
    try: async () => (await connections.db().todo.findUnique({ where: { id } })) as Todo,
    catch: (error: unknown) => new errors.get_all_item_todo_error((error as Error).message)
  });
};
export { create_item, delete_item, get_all_item, get_item_by_id, update_item };
