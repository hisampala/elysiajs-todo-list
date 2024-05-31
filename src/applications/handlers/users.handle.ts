import { Effect } from "effect";
import Elysia from "elysia";
import * as services from "../../core/services";
import { UsersInputType } from "../../types";
import { UsersCreateInput } from "../../types/UsersCreateInput";
import { UsersUpdateInput } from "../../types/UsersUpdateInput";
export const users_handler = (app: Elysia<"/users">) => {
  app.get("/v1", async (c) => {
    const program = services.get_all_item();
    const result = await Effect.runPromise(program);
    return result;
  });
  app.post(
    "/v1",
    async ({ body }) => {
      const item = services.hash_password(body as UsersInputType);
      const program = services.create_item(item);
      const result = await Effect.runPromise(program);
      return result;
    },
    {
      body: UsersCreateInput
    }
  );
  app.put(
    "/v1/:id",
    async ({ body, params }) => {
      const program = services.update_item(params.id, body);
      const result = await Effect.runPromise(program);
      return result;
    },
    {
      body: UsersUpdateInput
    }
  );
  return app;
};
