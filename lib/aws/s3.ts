import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";

export interface UploadParams {
  Bucket: string;
  Key: string | undefined;
  Body: fs.ReadStream;
  ContentType: string;
}
interface GetParams {
  Bucket: string;
  Key: {
    profileImgName: string | null;
    backgroundImgName: string | null;
    galleryImgName: string | null;
  };
}
export interface GetParam {
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
    }
    // If you want to return something after all uploads are done,
    // you can return a success message or an array of upload results.
    return "All uploads completed successfully";
  } catch (err) {
    console.log({ err });
    return null;
  }
};

export const deleteImagesS3 = async (paramsArray: GetParam[]) => {
  try {
    for (let i = 0; i < paramsArray.length; i++) {
      const params = paramsArray[i];
      if (!params || !params.Key) {
        throw new Error("Key is missing");
      }
      params.Key = `uploads/${params.Key}`;
      const command = new DeleteObjectCommand({
        Bucket: params.Bucket,
        Key: params.Key,
      });
      const upload = await s3.send(command);
    }
    // If you want to return something after all uploads are done,
    // you can return a success message or an array of upload results.
    return "All uploads completed successfully";
  } catch (err) {
    console.log({ err });
    return null;
  }
};

export const getImages = async (paramsArray: GetParams[]) => {
  try {
    let profileUrls: string[] = [];
    let backgroundUrls: string[] = [];

    for (let i = 0; i < paramsArray.length; i++) {
      const params = paramsArray[i];
      if (!params || !params.Key) {
        throw new Error("Key is missing");
      }
      const profileImgKey = params.Key.profileImgName
        ? `uploads/${params.Key.profileImgName}`
        : null;
      const backgroundImgKey = params.Key.backgroundImgName
        ? `uploads/${params.Key.backgroundImgName}`
        : null;

      if (profileImgKey) {
        const profileCommand = new GetObjectCommand({
          ...params,
          Key: profileImgKey,
        });
        const profileUrl = await getSignedUrl(s3, profileCommand, {
          expiresIn: 3600,
        });
        profileUrls.push(profileUrl);
      }

      if (backgroundImgKey) {
        const backgroundCommand = new GetObjectCommand({
          ...params,
          Key: backgroundImgKey,
        });
        const backgroundUrl = await getSignedUrl(s3, backgroundCommand, {
          expiresIn: 3600,
        });
        backgroundUrls.push(backgroundUrl);
      }
    }
    return { profileUrls, backgroundUrls };
  } catch (err) {
    console.log(err);
    throw new Error("internal error");
  }
};
const imgIxLoader = (src: string) => {
  const url = new URL(src);

  const imgIxName = url.pathname.split("/").pop();

  const imgIxUrl = new URL("https://imgixs3.imgix.net");
  imgIxUrl.pathname = `/${imgIxName}`;
  imgIxUrl.searchParams.set("auto", "format");
  imgIxUrl.searchParams.set("auto", "compress");
  imgIxUrl.searchParams.set("q", "75");
  return imgIxUrl.href;
};
export const getImages2 = async (paramsArray: GetParams[]) => {
  try {
    let profileUrls: string = "";
    let backgroundUrls: string = "";
    let galleryImgUrls: { url: string; fileName: string }[] = [];

    for (let i = 0; i < paramsArray.length; i++) {
      const params = paramsArray[i];
      if (!params || !params.Key) {
        throw new Error("Key is missing");
      }
      const profileImgKey = params.Key.profileImgName
        ? `uploads/${params.Key.profileImgName}`
        : null;
      const backgroundImgKey = params.Key.backgroundImgName
        ? `uploads/${params.Key.backgroundImgName}`
        : null;

      const galleryImgKey = params.Key.galleryImgName
        ? `uploads/${params.Key.galleryImgName}`
        : null;

      if (profileImgKey) {
        const profileCommand = new GetObjectCommand({
          ...params,
          Key: profileImgKey,
        });
        const profileUrl = await getSignedUrl(s3, profileCommand, {
          expiresIn: 3600,
        });
        const url = imgIxLoader(profileUrl);
        profileUrls = url;
      }

      if (backgroundImgKey) {
        const backgroundCommand = new GetObjectCommand({
          ...params,
          Key: backgroundImgKey,
        });
        const backgroundUrl = await getSignedUrl(s3, backgroundCommand, {
          expiresIn: 3600,
        });
        const url = imgIxLoader(backgroundUrl);

        backgroundUrls = url;
      }
      if (galleryImgKey) {
        const galleryImgCommand = new GetObjectCommand({
          ...params,
          Key: galleryImgKey,
        });
        const galleryImgUrl = await getSignedUrl(s3, galleryImgCommand, {
          expiresIn: 3600,
        });
        const url = imgIxLoader(galleryImgUrl);

        galleryImgUrls.push({ url: url, fileName: galleryImgKey });
      }
    }
    return { profileUrls, backgroundUrls, galleryImgUrls };
  } catch (err) {
    console.log(err);
    throw new Error("internal error");
  }
};

export const getImage = async (params: GetParam) => {
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
