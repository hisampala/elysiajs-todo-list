import Elysia from "elysia";
import { AuthInput, AuthInputType } from "../../types/AuthInput";
import * as service from "../../core/services"
import { Effect } from "effect";
export const auth_handler = (app: Elysia<"/auth">) => {
  return app.post("/v1", async ({body}) => {
    const program = service.auth(body as AuthInputType)
    const result =await Effect.runPromise(program)
    return result
  },{
    body:AuthInput
  });
};
