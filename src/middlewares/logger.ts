import { logger } from "@/utils/logger";
import { getConnInfo } from "@hono/node-server/conninfo";
import type { MiddlewareHandler } from "hono";

export const loggerMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const ipAddr = getConnInfo(c).remote.address;
    const requestId = c.get("requestId");
    const path = c.req.path;
    const method = c.req.method;
    const userAgent = c.req.header("User-Agent");

    logger.info({ ipAddr, method, path, requestId, userAgent });

    await next();

    logger.info({
      ipAddr,
      method,
      path,
      requestId,
      userAgent,
      httpStatus: c.res.status,
    });
  };
};
