import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import {
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME,
} from "../../../config";

// Set up the AWS s3 client
const client = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
  },
});

export const uploadMediaToBucket = async (
  multimediaObjectId: string,
  multimedia: any,
) => {
  console.log("multimedia: ", multimedia);
  // console.log("contentType: ", contentType);
  // Convert base64 string to Buffer
  const buffer = Buffer.from(multimedia.buffer, "base64");

  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: multimediaObjectId,
    Body: buffer,
    ContentType: multimedia.contentType,
  });

  try {
    const response = await client.send(command);
    console.log("UPLOADED");
    console.log(response);
  } catch (err) {
    console.log("ERROR");
    console.error(err);
  }
};

export const deleteSingleMultimediaFromBucket = async (
  multimediaObjectId: string,
) => {
  console.log("Deleting...: ", multimediaObjectId);
  try {
    const data = await client.send(
      new DeleteObjectCommand({
        Bucket: AWS_S3_BUCKET_NAME,
        Key: multimediaObjectId,
      }),
    );
    console.log("Success. Object deleted.", data);
  } catch (err) {
    console.log("Error", err);
  }
};

/*
To actually render the media on the UI, 
you'll need to use the retrieved media content (the Buffer or Uint8Array) 
and appropriately render it based on its content type (e.g., display an image for 'image/png'). 
You might use HTML tags like <img> for images or other appropriate methods depending on the media type.
*/
export const getMultimediaFromBucket = async (multimediaObjectId: string) => {
  try {
    const command = new HeadObjectCommand({
      Bucket: AWS_S3_BUCKET_NAME,
      Key: multimediaObjectId,
    });
    const metadata = await client.send(command);
    console.log(`Metadata for ${multimediaObjectId}:`, metadata);
    return metadata;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
