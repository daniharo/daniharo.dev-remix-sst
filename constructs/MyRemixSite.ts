import { RemixSite, Stack } from "sst/constructs";
import { CustomResource } from "aws-cdk-lib";
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { randomUUID } from "crypto";
// @ts-ignore
export class MyRemixSite extends RemixSite {
  private createCloudFrontInvalidation() {
    const stack = Stack.of(this) as Stack;

    const policy = new Policy(this, "CloudFrontInvalidatorPolicy", {
      statements: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: [
            "cloudfront:GetInvalidation",
            "cloudfront:CreateInvalidation",
          ],
          resources: [
            // @ts-ignore
            `arn:${stack.partition}:cloudfront::${stack.account}:distribution/${this.distribution.distributionId}`,
          ],
        }),
      ],
    });
    stack.customResourceHandler.role?.attachInlinePolicy(policy);

    const publicInvalidator = new CustomResource(
      this,
      "CloudFrontInvalidator",
      {
        serviceToken: stack.customResourceHandler.functionArn,
        resourceType: "Custom::CloudFrontInvalidator",
        properties: {
          buildId: this.generateBuildId(),
          // @ts-ignore
          distributionId: this.distribution.distributionId,
          paths: ["/*"],
          waitForInvalidation: this.props.waitForInvalidation,
        },
      }
    );
    publicInvalidator.node.addDependency(policy);
    const ssgInvalidator = new CustomResource(this, "CloudFrontInvalidator2", {
      serviceToken: stack.customResourceHandler.functionArn,
      resourceType: "Custom::CloudFrontInvalidator",
      properties: {
        buildId: randomUUID(),
        // @ts-ignore
        distributionId: this.distribution.distributionId,
        paths: ["/"],
        waitForInvalidation: this.props.waitForInvalidation,
      },
    });
    ssgInvalidator.node.addDependency(policy);

    return [publicInvalidator, ssgInvalidator];
  }
}
