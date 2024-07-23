import { ApiHandler } from "sst/node/api";

import { datadog } from "datadog-lambda-js";

export const handler = datadog(ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: `Hello world. The time is ${new Date().toISOString()}`,
  };
}));
