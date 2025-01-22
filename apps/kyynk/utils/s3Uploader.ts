import { s3Client } from '@/lib/s3/client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export const uploadToS3 = async ({
  file,
  folder,
  fileType,
}: {
  file: Buffer | File;
  folder: 'medias' | 'thumbnails';
  fileType?: string;
}) => {
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET;
  if (!bucketName) throw new Error('S3 Bucket name is missing');

  const uniqueId = uuidv4();
  let fileExtension = '';

  let fileKey = '';

  if (file instanceof File) {
    fileExtension = file.name.split('.').pop() || 'jpg';
    fileKey = `${folder}/${uniqueId}.${fileExtension}`;
  } else if (file instanceof Buffer) {
    if (!fileType) throw new Error('fileType is required for Buffer uploads');
    fileExtension = fileType.split('/')[1] || 'jpg';
    fileKey = `${folder}/${uniqueId}.${fileExtension}`;
  } else {
    throw new Error('Unsupported file type');
  }

  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: file,
    ContentType: file instanceof File ? file.type : fileType,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return fileKey;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};
