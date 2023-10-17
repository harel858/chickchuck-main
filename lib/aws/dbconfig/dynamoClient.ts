// Create service client module using ES6 syntax.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Set the AWS Region.
const REGION = "eu-west-1"; //e.g. "us-east-1"
// Create an Amazon DynamoDB service client object.
const accessKey = process.env.ROOT_ACCESS_KEY!;
const secretAccessKey = process.env.ROOT_SECRET_ACCESS_KEY!;

const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});

export { ddbClient };
