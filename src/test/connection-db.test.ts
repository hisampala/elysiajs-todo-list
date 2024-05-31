import { describe, expect, it } from "bun:test";
import * as connections from "../core/services/connections";
describe("Connection DB Testing", () => {
  it("connect", async () => {
    expect(await connections.db().$connect()).toBe(undefined);
  });
});
