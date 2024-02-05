import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";

export interface UploadParams {
  Bucket: string;
  Key: string | undefined;
  Body: fs.ReadStream;
  ContentType: string;
}
interface getParams {
  Bucket: string;
  Key: { profileImgName: string | null; backgroundImgName: string | null };
}
interface getParam {
  Bucket: string;
  Key: string | null;
}

const bucketRegion = process.env.BUCKET_REGION!;
const accessKey = process.env.ACCESS_KEY!;
const secretAccessKey = process.env.SECRET_ACCESS_KEY!;

const s3 = new S3Client({
  credentials: { accessKeyId: accessKey, secretAccessKey: secretAccessKey },
  region: bucketRegion,
});

export const uploadImages = async (paramsArray: UploadParams[]) => {
  try {
    for (let i = 0; i < paramsArray.length; i++) {
      const params = paramsArray[i];
      if (!params || !params.Key) {
        throw new Error("Key is missing");
      }
      params.Key = `uploads/${params.Key}`;
      const command = new PutObjectCommand(params);
      const upload = await s3.send(command);
      console.log("upload", upload);
    }
    // If you want to return something after all uploads are done,
    // you can return a success message or an array of upload results.
    return "All uploads completed successfully";
  } catch (err) {
    console.log({ err });
    return null;
  }
};

export const getImages = async (paramsArray: getParams[]) => {
  try {
    let urls: string[] = [];
    for (let i = 0; i < paramsArray.length; i++) {
      const params = paramsArray[i];
      if (!params || !params.Key) {
        throw new Error("Key is missing");
      }
      const command = new GetObjectCommand({
        ...params,
        Key: `uploads/${params.Key}`,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      console.log({ url });
      urls.push(url);
    }
    return urls;
  } catch (err) {
    console.log(err);
    throw new Error("internal error");
  }
};

export const getImage = async (params: getParam) => {
  if (!params.Key) return null;
  try {
    const command = new GetObjectCommand({
      ...params,
      Key: `uploads/${params.Key}`,
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return url;
  } catch (err) {
    console.log(err);
    return null;
  }
};
