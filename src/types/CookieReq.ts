import { Static, Type } from "@sinclair/typebox";

export const CookieRequest = Type.Object({
  token: Type.String(),
  refresh_token: Type.String()
});

export type CookieRequestType = Static<typeof CookieRequest>;
