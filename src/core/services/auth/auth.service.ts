import { Users } from "@prisma/client";
import { Effect, pipe } from "effect";
import { sign, verify } from "jsonwebtoken";
import { AuthInputType } from "../../../types/AuthInput";
import * as config from "../../config";
import { JWTITEMType, JWTType, REFRESH_JWTType } from "../../model";
import * as service_users from "../users";
import * as errors from "./error";
const auth = (item: AuthInputType) =>
  pipe(
    service_users.get_item_by_username(item.username),
    Effect.let("users", valid_username(item.username)),
    Effect.let("valid_pass", ({ password }) => valid_password(password)),
    Effect.let("tokens", ({ users }) => generate_token_and_refresh_token(users, item.user_agent)),
    Effect.tap(({ id, tokens }) => update_refresh_token(id, tokens)),
    Effect.map(({ tokens }) => tokens)
  );
const valid_username = (username: string) => {
  return (user: Users | null) => {
    if (!user) throw new Error(`notfount user at username ${username}`);
    return user;
  };
};
const valid_password = (password: string) => (user: Users | null) => {
  const valid = service_users.verify_password(user.password, password);
  if (!valid) throw new Error(`password incorrect`);
  return valid;
};
const generate_token_and_refresh_token = (user: Users, user_agent: string) => {
  if (!user_agent || user_agent.length < 1) throw new Error(`notfount user-agent`);
  const token = generate_token(user);
  const refresh_token = generate_token_refresh_token(token, user_agent);
  return { token, refresh_token } as JWTITEMType;
};
const generate_token = (user: Users) => {
  const temp_gen_token: JWTType = {
    id: user.id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
  };
  const env = config.env();
  return sign(JSON.stringify(temp_gen_token), env.SECERT_KEY);
};
const generate_token_refresh_token = (token: string, user_agent: string) => {
  const env = config.env();
  const temp_gen_refresh_token: REFRESH_JWTType = {
    jwt: token,
    user_agent,
    exp: Math.floor(Date.now() / 1000) + 60 * 60
  };
  const refresh_token = sign(JSON.stringify(temp_gen_refresh_token), env.SECERT_KEY);
  return refresh_token;
};
const verify_jwt_token = (jwt: string) => {
  return Effect.tryPromise({
    try: async () => {
      const env = config.env();
      const token = verify(jwt, env.SECERT_KEY);
      const token_item = token as JWTType;
      return token_item;
    },
    catch: (err: unknown) => new errors.verify_jwt_token_error((err as Error).message)
  });
};
const verify_jwt_refresh_token_process = (jwt: string) => {
  const env = config.env();
  verify(jwt, env.SECERT_KEY);
  return jwt;
};
const generate_token_and_refresh_token_and_update = (user_agent: string) => {
  return (user: Users) => {
    return Effect.tryPromise({
      try: async () => {
        const new_token_with_refresh_token = generate_token_and_refresh_token(user as unknown as Users, user_agent);
        const program_update_refresh_token = update_refresh_token(user.id, new_token_with_refresh_token);
        await Effect.runPromise(program_update_refresh_token);
        return new_token_with_refresh_token;
      },
      catch: (err: unknown) => new errors.generate_token_and_refresh_token_and_update_error((err as Error).message)
    });
  };
};
const verify_refreshtoken_is_matchs = (jwt: string) => {
  return (user: Users) => {
    // console.log(user)
    if (!user || !user.refresh_token) throw new Error("notfount refreshtoken");
    const refresh_token = verify_jwt_refresh_token_process(jwt);
    if (refresh_token !== user.refresh_token) throw new Error("refreshtoken is not matches");
    return user;
  };
};
const verify_jwt_refresh_token = (jwt: string, token_item: JWTType, user_agent: string) => {
  return pipe(
    service_users.get_item_by_id(token_item.id),
    Effect.map(verify_refreshtoken_is_matchs(jwt)),
    Effect.flatMap(generate_token_and_refresh_token_and_update(user_agent))
  );
};
const update_refresh_token = (user_id: string, tokens: JWTITEMType) => service_users.update_item(user_id, { refresh_token: tokens.refresh_token });
export { auth, verify_jwt_refresh_token, verify_jwt_token };
