import { StackContext, RemixSite } from "sst/constructs";

export function WebSite({ stack }: StackContext) {
  const site = new RemixSite(stack, "Site", {
    path: "packages/web/",
  });

  stack.addOutputs({
    URL: site.url || "localhost",
  });
}
