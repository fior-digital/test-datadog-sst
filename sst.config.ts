import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import { Datadog } from "datadog-cdk-constructs-v2";
import { Stack } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "datadog-test",
      region: "eu-west-1",
    };
  },
  stacks(app) {
    app.stack(API);


    app.node.children.forEach((stack) => {
      if (stack instanceof Stack) {
        const datadog = new Datadog(stack, "datadog", {
          // Get the latest version from
          // https://github.com/Datadog/datadog-lambda-js/releases
          forwarderArn: "ARN OF THE FORWARDER",
          nodeLayerVersion: 112,
          enableProfiling: true,
          sourceCodeIntegration: true,
          site: "datadoghq.eu",
          env: app.stage,
          service: app.name,
          logLevel: "debug",
        });

        datadog.addLambdaFunctions(stack.getAllFunctions());
      }
    });

  }
} satisfies SSTConfig;
