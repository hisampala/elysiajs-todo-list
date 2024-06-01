import { Effect } from "effect";
import { Context } from "elysia";
import * as services from "../../core/services/auth";
import * as middleware from "../middleware";
const token_guard = async (c: Context) => {
//   await middleware.authorization(c);
  const token = c.cookie.token.value;
  if (!token) throw c.error("Unauthorized");
  const verify_jwt_token = await Effect.runPromise(services.verify_jwt_token(token));
  c.store["user_id"] = verify_jwt_token.id;
};
export { token_guard };
