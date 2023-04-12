import { SSTConfig } from "sst";
import { WebSite } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "daniharodev-remix",
      region: "eu-west-3",
    };
  },
  stacks(app) {
    app.stack(WebSite);
  },
} satisfies SSTConfig;
