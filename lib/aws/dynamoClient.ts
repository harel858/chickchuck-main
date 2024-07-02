import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const accessKey = process.env.ACCESS_KEY!;
const secretAccessKey = process.env.SECRET_ACCESS_KEY!;

export const client = new DynamoDBClient({
  region: "eu-west-1",
  credentials: { accessKeyId: accessKey, secretAccessKey: secretAccessKey },
});
