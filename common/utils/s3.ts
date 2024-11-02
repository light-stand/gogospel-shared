import { PutObjectCommand, S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { ReadableStream } from "web-streams-polyfill";
//@ts-ignore
globalThis.ReadableStream = ReadableStream;

const options = {
  keyPrefix: "uploads",
  bucket: process.env.EXPO_PUBLIC_S3_BUCKET,
  region: process.env.EXPO_PUBLIC_S3_REGION,
};

const client = new S3Client({
  forcePathStyle: true,
  region: process.env.EXPO_PUBLIC_S3_REGION,
  endpoint: process.env.EXPO_PUBLIC_S3_URL,
  credentials: {
    accessKeyId: process.env.EXPO_PUBLIC_S3_ACCESS_ID as string,
    secretAccessKey: process.env.EXPO_PUBLIC_S3_SECRET as string,
  },
});

const BASE_URL = `${process.env.EXPO_PUBLIC_SB_API_REST_URL}/storage/v1/object/public/${options.bucket}/`;

export type S3File = {
  uri: string;
  type: string;
  name: string;
};

export const uploadFile = async (file: S3File) => {
  try {
    const resp = await fetch(file.uri);
    const imageBody = await resp.blob();
    const key = `${options.keyPrefix}/${file.name}`;
    await client.send(
      new PutObjectCommand({
        Bucket: options.bucket,
        Key: key,
        Body: imageBody,
        ACL: "public-read",
      })
    );
    return `${BASE_URL}${key}`;
  } catch (err) {
    console.log(err);
  }
};

export const deleteFile = async (url: string) => {
  const command = new DeleteObjectCommand({
    Bucket: options.bucket,
    Key: url.replace(BASE_URL, ""),
  });

  try {
    return await client.send(command);
  } catch (err) {
    console.error(err);
  }
};
