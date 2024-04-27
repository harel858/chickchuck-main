"use server";
import {
  DynamoDBClient,
  UpdateItemCommand,
  GetItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import { client } from "@lib/aws/dynamoClient";
import { Notification } from "types/types";

interface Data {
  connectionId: string;
  date: number;
  messages: string[];
  stage: string;
  domainName: string;
  ID: string;
}

// Initialize the DynamoDB client

const docClient = DynamoDBDocumentClient.from(client);
const updateItem = async (notification: Notification) => {
  try {
    const getCommand = new GetItemCommand({
      Key: { ID: { S: notification.userId } },
      TableName: "sessionsTable",
    });
    const itemData = await docClient.send(getCommand);
    console.log("itemData", itemData);
    if (!itemData.Item) throw new Error("item not found");
    const item = unmarshall(itemData.Item);
    console.log("data.messages", item.data.messages);
    const data = item.data;
    console.log("data", data);

    const messages = item.data.messages as Notification[];
    const messagesToUpdated: Notification[] = messages.map((item) =>
      item.appointmentId == notification.appointmentId
        ? { ...item, read: true }
        : item
    );
    const newData = marshall({
      ...data,
      messages: messagesToUpdated,
    });
    console.log("newData", newData);

    // Now, you can access the 'messages' property in 'data'
    const params: UpdateItemCommandInput = {
      Key: { ID: { S: notification.userId } },
      TableName: "sessionsTable",
      UpdateExpression: "set #data = :newData",
      ExpressionAttributeNames: {
        "#data": "data",
      },
      ExpressionAttributeValues: {
        ":newData": { M: newData },
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
