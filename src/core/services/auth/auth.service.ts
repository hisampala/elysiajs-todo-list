import { Effect } from "effect";
import { AuthInputType } from "../../../types";
import * as service_users from "../users";
import * as error from "./error/";
const auth = (item: AuthInputType) => {};
const valid_username = (username: string) => {
  return Effect.tryPromise({
    try: async () => await service_users.get_item_by_username(username),
    catch: (err: unknown) => new error.valid_username_error((err as Error).message)
  });
};
export {};
