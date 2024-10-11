import { loggerMiddleware } from "@/middlewares/logger";
import { base } from "@/routes";
import { logger } from "@/utils/logger";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { requestId } from "hono/request-id";
import { env } from "./config";
const app = new Hono();

app.use("*", requestId());

app.use(cors());

app.use(loggerMiddleware());

app.use("/*", etag());

app.route("/", base);

const server = serve(
  {
    fetch: app.fetch,
    port: env.PORT,
    hostname: env.HOSTNAME,
  },
  ({ port, address }) =>
    logger.info(`hono-js starter started at port ${port} as ${address}`),
);

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received.");
  server.close(() => {
    logger.info("server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  logger.info("SIGINT signal received.");
  server.close(() => {
    logger.info("server closed");
    process.exit(0);
  });
});
