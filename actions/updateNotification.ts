"use server";

import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { ddbClient } from "@lib/aws/dbconfig/dynamoClient";
import { Notification } from "types/types";
const accessKey = process.env.ROOT_ACCESS_KEY!;
const secretAccessKey = process.env.ROOT_SECRET_ACCESS_KEY!;
console.log("accessKey", accessKey);
console.log("secretAccessKey", secretAccessKey);

// Initialize the DynamoDB client
const client = new DynamoDBClient({
  region: "eu-west-1",
  credentials: { accessKeyId: accessKey, secretAccessKey: secretAccessKey },
});
const docClient = DynamoDBDocumentClient.from(client);
const updateItem = async (notification: Notification) => {
  try {
    const newData: Notification = {
      ...notification,
      read: true,
    };
    const params = {
      Key: { ID: { S: notification.userId } },
      TableName: "sessionsTable",
      UpdateExpression: "set #data = :newData",
      ExpressionAttributeNames: {
        "#data": "data",
      },
      ExpressionAttributeValues: {
        ":newData": { S: JSON.stringify(newData) },
      },
      // You can change this to "ALL_OLD" if you want to return the previous item
    };
    const command = new UpdateItemCommand(params);

    const response = await docClient.send(command); // Use ddbClient here
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default updateItem;
