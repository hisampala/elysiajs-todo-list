import { Users } from "@prisma/client";
import * as crypto from "crypto-js";
import { Effect } from "effect";
import { UsersInputType } from "../../../types";
import * as connections from "../connections";
import delete_prop_password from "./delete-prop-password";
import * as errors from "./error";
const create_item = (item: UsersInputType) => {
  return Effect.tryPromise({
    try: async () => await connections.db().users.create({ data: item }),
    catch: (error: unknown) => new errors.create_item_users_error((error as Error).message)
  }).pipe(Effect.map(delete_prop_password));
};
const update_item = (id: string, item: Partial<UsersInputType>) => {
  return Effect.tryPromise({
    try: async () => await connections.db().users.update({ where: { id }, data: item }),
    catch: (error: unknown) => new errors.update_item_users_error((error as Error).message)
  }).pipe(Effect.map(delete_prop_password));
};
const delete_item = (id: string) => {
  return Effect.tryPromise({
    try: async () => await connections.db().users.delete({ where: { id } }),
    catch: (error: unknown) => new errors.delete_item_users_error((error as Error).message)
  }).pipe(Effect.map(delete_prop_password));
};
const get_all_item = () => {
  return Effect.tryPromise({
    try: async () => await connections.db().users.findMany(),
    catch: (error: unknown) => new errors.get_all_item_users_error((error as Error).message)
  }).pipe(Effect.map((l) => l.map(delete_prop_password)));
};
const get_item_by_id = (id: string) => {
  return Effect.tryPromise({
    try: async () => (await connections.db().users.findUnique({ where: { id } })) as Users,
    catch: (error: unknown) => new errors.get_all_item_users_error((error as Error).message)
  }).pipe(Effect.map(delete_prop_password));
};
const get_item_by_username = (username: string) => {
  return Effect.tryPromise({
    try: async () => await connections.db().users.findFirst({ where: { username } }),
    catch: (error: unknown) => new errors.get_all_item_users_error((error as Error).message)
  });
};
const hash_password = (item: UsersInputType) => {
  item.password = crypto.SHA256(item.password).toString();
  return item;
};
const verify_password = (hash_password: string, password: string) => {
  const temp = crypto.SHA256(password).toString();
  console.log({ hash_password, temp });
  return temp === hash_password;
};
export { create_item, delete_item, get_all_item, get_item_by_id, get_item_by_username, hash_password, update_item, verify_password };
