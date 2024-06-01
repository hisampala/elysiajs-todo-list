import { add } from "date-fns";
import { Effect } from "effect";
import Elysia from "elysia";
import * as service from "../../core/services";
import { AuthInput, AuthInputType } from "../../types/AuthInput";
import { CookieRequest } from "../../types/CookieReq";
import * as middleware from "../middleware";
export const auth_handler = (app: Elysia<"/auth">) => {
  return app
    .get("/v1/refresh_token", () => "ok", {
      cookie: CookieRequest,
      beforeHandle: middleware.authorization
    })
    .post(
      "/v1",
      async ({ body, headers, cookie: { token, refresh_token } }) => {
        console.log({ headers });
        const program = service.auth({ ...(body as AuthInputType), user_agent: headers["user-agent"] });
        const result = await Effect.runPromise(program);
        console.log({ result });
        token.set({
          value: result.token,
          expires: add(new Date(), { days: 1 })
        });
        refresh_token.set({
          value: result.refresh_token,
          expires: add(new Date(), { hours: 1 })
        });
        return "ok";
      },
      {
        body: AuthInput
      }
    );
};
