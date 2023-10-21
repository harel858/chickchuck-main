import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";

interface UploadParams {
  Bucket: string;
  Key: string;
  Body: fs.ReadStream;
  ContentType: string;
}
interface getParams {
  Bucket: string;
  Key: { profileImgName: string | null; backgroundImgName: string | null };
}
const bucketRegion = process.env.BUCKET_REGION!;
const accessKey = process.env.ACCESS_KEY!;
const secretAccessKey = process.env.SECRET_ACCESS_KEY!;

const s3 = new S3Client({
  credentials: { accessKeyId: accessKey, secretAccessKey: secretAccessKey },
  region: bucketRegion,
});

export const uploadImage = async (params: UploadParams) => {
  try {
    params.Key = `uploads/${params.Key}`;
    const command = new PutObjectCommand(params);
    const upload = await s3.send(command);
    console.log({ upload });

    return upload;
  } catch (err) {
    console.log({ err });
    return null;
  }
};

export const getImage = async (params: getParams) => {
  if (!params.Key.backgroundImgName && !params.Key.profileImgName) return null;
  try {
    const urls = {
      backgroundImage: "",
      profileImage: "",
    };
    if (params.Key.backgroundImgName) {
      const command = new GetObjectCommand({
        ...params,
        Key: `uploads/${params.Key.backgroundImgName}`,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      console.log({ url });

      urls.backgroundImage = url;
    }
    if (params.Key.profileImgName) {
      const command = new GetObjectCommand({
        ...params,
        Key: `uploads/${params.Key.profileImgName}`,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      console.log({ url });

      urls.profileImage = url;
    }
    console.log({ urls });

    return urls;
  } catch (err) {
    console.log(err);
    return null;
  }
};
