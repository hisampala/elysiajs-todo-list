import { describe, expect, it } from "bun:test";
import { v4 } from "uuid";
import * as service from "./../core/services";
describe("USers Service Testing", () => {
  const item = { fisrt_name: "test", last_name: "test", password: "test", username: "test", id: v4() };
  it("create", async () => {
    const result = service.create_item(item);
    expect(result).toBeObject();
  });
  it("get_all_item", async () => {
    const result = service.get_all_item();
    expect(result).pass();
  });
  it("update", async () => {
    const result = service.update_item(item.id, item);
    expect(result).toBeObject();
  });
  it("delete", async () => {
    const result = service.delete_item(item.id);
    expect(result).toBeObject();
  });
});
