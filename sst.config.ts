import { SSTConfig } from "sst";
import { WebSite } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "daniharodev-remix",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(WebSite);
  },
} satisfies SSTConfig;
