import { ApiGatewayManagementApi } from "@aws-sdk/client-apigatewaymanagementapi";
import { calendar_v3 } from "googleapis";
interface Messages {
  userId: string;
  message: string;
}
const create = (domainName: string, stage: string) => {
  const endpoint = `https://${domainName}/${stage}`;
  console.log(endpoint);

  return new ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    endpoint,
    region: "eu-west-1",
  });
};

const send = async ({
  connectionID,
  domainName,
  messages,
  stage,
}: {
  domainName: any;
  stage: any;
  connectionID: any;
  messages: calendar_v3.Schema$Events[];
}) => {
  console.log({
    connectionID,
    domainName,
    messages,
    stage,
  });

  try {
    const ws = create(domainName, stage);
    const newMessage = [messages[messages.length - 1]];

    const postParams = {
      Data: JSON.stringify(newMessage),
      ConnectionId: connectionID,
    };
    return ws.postToConnection(postParams);
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export default send;
