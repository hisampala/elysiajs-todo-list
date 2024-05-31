import { Effect } from "effect";
import Elysia from "elysia";
import * as services from "../../core/services";
export const users_handler = (app: Elysia<"/users">) => {
  app.get("/v1", async (c) => {
    const program = services.get_all_item();
    const result = await Effect.runPromise(program);
    return result;
  });
  return app;
};
