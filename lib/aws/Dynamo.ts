import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  DeleteCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
  QueryCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { client } from "./dynamoClient";
interface Messages {
  userId: string;
  message: string;
}

interface Data {
  connectionId: string;
  date: number;
  messages: string[];
  stage: string;
  domainName: string;
  ID: string;
}
const docClient = DynamoDBDocumentClient.from(client);
export async function writeData(data: Data, TableName: string) {
  try {
    const params = {
      Item: { data, ID: data.ID, connectionId: data.connectionId }, // Include the connectionId for the secondary index
      TableName: TableName,
    };

    const command = new PutCommand(params); // Use the updated params with connectionId

    const response = await docClient.send(command);

    return response;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
}
export async function updateItemData(
  ID: string,
  newData: any,
  TableName: string
) {
  try {
    // Define the Update Expression and Expression Attribute Values
    const updateParams: UpdateCommandInput = {
      TableName: TableName,
      Key: {
        ID: ID,
      },
      UpdateExpression: "set #data = :newData",
      ExpressionAttributeNames: {
        "#data": "data",
      },
      ExpressionAttributeValues: {
        ":newData": newData,
      },
      ReturnValues: "ALL_NEW", // You can change this to "ALL_OLD" if you want to return the previous item
    };

    const updateCommand = new UpdateCommand(updateParams);
    const updatedItemResponse = await docClient.send(updateCommand);

    const updatedItem = updatedItemResponse.Attributes;

    return updatedItem;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
export async function updateSecondaryIndexValue(
  connectionId: string,
  newConnectionId: string,
  TableName: string
) {
  try {
    // Step 1: Query the item based on the current connectionId
    const queryParams = {
      TableName: TableName,
      IndexName: "connectionId-index", // Replace with the name of your LSI
      KeyConditionExpression: "#connectionId = :connectionId",
      ExpressionAttributeNames: {
        "#connectionId": "connectionId", // Replace with the LSI attribute name
      },
      ExpressionAttributeValues: {
        ":connectionId": connectionId,
      },
    };

    const queryCommand = new QueryCommand(queryParams);
    const queryResponse = await docClient.send(queryCommand);

    // Step 2: Retrieve the item's attributes
    const item = queryResponse.Items?.[0]; // Assuming you expect only one item with the specified connectionId

    if (!item) {
      throw new Error("Item not found");
    }

    // Step 3: Create a new item with the updated connectionId and all other attributes
    const newItem = {
      ...item,
      connectionId: newConnectionId,
    };

    // Step 4: Delete the original item
    const deleteParams = {
      TableName: TableName,
      Key: {
        ID: item.ID,
      },
    };

    const deleteCommand = new DeleteCommand(deleteParams);
    await docClient.send(deleteCommand);

    // Step 5: Insert the new item with the updated connectionId
    const putParams = {
      TableName: TableName,
      Item: newItem,
    };

    const putCommand = new PutCommand(putParams);
    await docClient.send(putCommand);

    return "Secondary index value updated successfully with all previous data";
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}

export async function updateSecondaryIndexValueById(
  ID: string,
  newConnectionId: string,
  TableName: string
) {
  try {
    // Step 1: Query the item based on the current connectionId
    const getParams = {
      TableName: TableName,
      Key: {
        ID: ID,
      },
    };

    const command = new GetCommand(getParams);
    const response = await docClient.send(command);

    const item = response.Item; // This will contain the retrieved item

    if (!item) {
      throw new Error("Item not found");
    }

    // Step 3: Create a new item with the updated connectionId and all other attributes
    const newItem = {
      ...item,
      connectionId: newConnectionId,
    };

    // Step 4: Delete the original item
    const deleteParams = {
      TableName: TableName,
      Key: {
        ID: item.ID,
      },
    };

    const deleteCommand = new DeleteCommand(deleteParams);
    await docClient.send(deleteCommand);

    // Step 5: Insert the new item with the updated connectionId
    const putParams = {
      TableName: TableName,
      Item: newItem,
    };

    const putCommand = new PutCommand(putParams);
    const res = await docClient.send(putCommand);

    return "Connected with Secondary index value updated successfully with all previous data";
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}

export async function deleteData(ID: string, TableName: string) {
  try {
    const params = { Key: { ID: ID }, TableName: TableName };
    const command = new DeleteCommand(params);
    const response = await docClient.send(command);
    return response;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
}

export async function updateConnectionId(
  connectionId: string,
  TableName: string
) {
  try {
    const params = {
      TableName,
      Key: {
        connectionId: connectionId,
      },
      UpdateExpression: "REMOVE connectionId",
      ConditionExpression: "connectionId = :connectionId",
      ExpressionAttributeValues: {
        ":connectionId": connectionId,
      },
    };

    const command = new UpdateCommand(params);

    const response = await docClient.send(command);
    return response;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
}

export async function insertConnectionId(
  userId: string,
  connectionId: string,
  TableName: string
) {
  try {
    const command = new UpdateCommand({
      Key: { ID: userId },
      UpdateExpression: "SET connectionId = :connectionId",
      ExpressionAttributeValues: {
        ":connectionId": connectionId,
      },
      TableName,
    });
    const response = await docClient.send(command);

    return response;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
}

export async function getDataByUserId(ID: string, TableName: string) {
  try {
    const params = { Key: { ID: ID }, TableName: TableName };

    const command = new GetCommand(params);
    const response = await docClient.send(command);

    return response.Item?.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
}

export async function getByConnectionId(
  connectionId: string,
  TableName: string
) {
  try {
    const params = {
      TableName: TableName,
      KeyConditionExpression: "connectionId = :connectionId",
      ExpressionAttributeValues: {
        ":connectionId": connectionId,
      },
    };

    const command = new QueryCommand(params);
    const response = await docClient.send(command);

    return response.Items; // Use response.Items to get the matching items
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
}
