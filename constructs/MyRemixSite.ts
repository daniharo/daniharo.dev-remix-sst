import { RemixSite } from "sst/constructs";

// @ts-ignore
export class MyRemixSite extends RemixSite {
  protected initBuildConfig() {
    const res = super.initBuildConfig();
    return {
      ...res,
      clientBuildVersionedSubDir: "this_does_not_exist_123",
    };
  }
}
