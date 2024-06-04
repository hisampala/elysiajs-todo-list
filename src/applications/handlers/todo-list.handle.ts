import { Effect } from "effect";
import Elysia from "elysia";
import * as services from "../../core/services/todo-list";
import { TodoInput, TodoType } from "../../types";
import { CookieRequest } from "../../types/CookieReq";
import * as middleware from "../middleware";
export const todo_list_handler = (app: Elysia<"/todo-list">) => {
  return app
    .post(
      "/v1",
      async ({ body }) => {
        const program = services.create_item(body as TodoType);
        const result = await Effect.runPromise(program);
        return result;
      },
      {
        cookie: CookieRequest,
        beforeHandle: middleware.authorization,
        body: TodoInput
      }
    )
    .put(
      "/v1/:id",
      async ({ body, params }) => {
        const program = services.update_item(params.id, body as TodoType);
        const result = await Effect.runPromise(program);
        return result;
      },
      {
        cookie: CookieRequest,
        beforeHandle: middleware.authorization,
        body: TodoInput
      }
    )

    .delete(
      "/v1/:id",
      async ({ params }) => {
        const program = services.delete_item(params.id);
        const result = await Effect.runPromise(program);
        return result;
      },
      {
        cookie: CookieRequest,
        beforeHandle: middleware.authorization
      }
    )
    .get(
      "/v1/:id",
      async ({ params }) => {
        const program = services.get_item_by_id(params.id);
        const result = await Effect.runPromise(program);
        return result;
      },
      {
        cookie: CookieRequest,
        beforeHandle: middleware.authorization
      }
    )
    .get(
      "/v1",
      async () => {
        const program = services.get_all_item();
        const result = await Effect.runPromise(program);
        return result;
      },
      {
        cookie: CookieRequest,
        beforeHandle: middleware.authorization
      }
    );
};
