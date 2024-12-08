import { s3Client } from '@/lib/s3/client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export const uploadToS3 = async ({
  file,
  folder,
}: {
  file: File;
  folder: 'medias';
}) => {
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET;

  const uniqueId = uuidv4();
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uniqueId}.${fileExtension}`;

  const fileKey = `${folder}/${fileName}`;

  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: file,
    ContentType: file.type,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return fileKey;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};
