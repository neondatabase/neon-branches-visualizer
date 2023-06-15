export const regionIds = [
  "aws-eu-central-1",
  "aws-ap-southeast-1",
  "aws-us-east-2",
  "aws-us-west-2",
] as const;

export const regions: Record<(typeof regionIds)[number], string> = {
  "aws-eu-central-1": "EU (Frankfurt)",
  "aws-ap-southeast-1": "Asia Pacific (Singapore)",
  "aws-us-east-2": "US East (Ohio)",
  "aws-us-west-2": "US West (Oregon)",
};
