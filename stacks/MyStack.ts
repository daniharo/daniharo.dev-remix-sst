import { StackContext } from "sst/constructs";
import { MyRemixSite } from "../constructs/MyRemixSite";

export function WebSite({ stack }: StackContext) {
  const site = new MyRemixSite(stack, "Site", {
    path: "packages/web/",
  });

  stack.addOutputs({
    URL: site.url || "localhost",
  });
}
