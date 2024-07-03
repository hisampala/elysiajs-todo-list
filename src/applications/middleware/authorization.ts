import { add } from "date-fns";
import { Effect, pipe } from "effect";
import { Context } from "elysia";
import * as services from "../../core/services/auth";
const authorization = async (c: Context) => {
  const token = c.cookie.token.value;
  const refresh_token = c.cookie.refresh_token.value;
  const user_agent = c.headers["user-agent"];
  if (!token && !refresh_token) throw c.error("Unauthorized");
  const program = pipe(
    services.verify_jwt_token(token),
    Effect.flatMap((jwt) => services.verify_jwt_refresh_token(refresh_token, jwt, user_agent))
  );
  const result = await Effect.runPromise(program);
  c.cookie.token.set({ value: result.token, expires: add(new Date(), { days: 1 }) });
  c.cookie.refresh_token.set({ value: result.refresh_token, expires: add(new Date(), { hours: 1 }) });
};
export { authorization };
