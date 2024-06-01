import { Elysia } from "elysia";
import * as handler from "./applications/handlers";
import * as config from "./core/config";
import * as connections from "./core/services/connections";
const app = new Elysia();
app.group("/users", handler.users_handler);
app.group("/auth", handler.auth_handler);
app.listen(3000, ({ hostname, port }) => {
  console.log(`🦊 Elysia is running at ${hostname}:${port}`);
  connections
    .db()
    .$connect()
    .then(() => console.log("connection database..."));
  app.routes.map((route) => console.log(`[${route.path}] [${route.method}] :${route.handler.name}`));
  console.log(config.env());
});
