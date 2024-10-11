import { Hono } from "hono";

export const base = new Hono();

base.get("/health", (c) => {
  return c.json({ status: "ok" });
});
