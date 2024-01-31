import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
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
  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: multimediaObjectId,
    Body: multimedia.data,
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
