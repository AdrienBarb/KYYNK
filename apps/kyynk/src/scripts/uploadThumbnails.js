import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'eu-west-3',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadToS3Direct(buffer, contentType) {
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET;
  if (!bucketName) throw new Error('S3 Bucket name is missing');

  const uniqueId = uuidv4();
  const fileExtension = contentType.split('/')[1] || 'jpg';
  const fileKey = `medias/${uniqueId}.${fileExtension}`;

  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: buffer,
    ContentType: contentType,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return fileKey;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
}

async function fetchAndUploadProfileImage(url) {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get the content type from the response
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Upload to S3
    const s3Key = await uploadToS3Direct(buffer, contentType);

    return s3Key;
  } catch (error) {
    console.error(`Error processing profile image: ${url}`, error);
    throw error;
  }
}

async function processAndUpdateSeedData() {
  // Read the seed data file
  const seedDataPath = join(__dirname, '../../seed2-updated.json');
  const seedData = JSON.parse(await readFile(seedDataPath, 'utf8'));

  const updatedData = await Promise.all(
    seedData.map(async (user) => {
      // Upload profile image
      const newProfileImageUrl = await fetchAndUploadProfileImage(
        user.profilImageUrl,
      );

      return {
        ...user,
        profilImageUrl: newProfileImageUrl,
      };
    }),
  );

  // Write the updated data back to a new JSON file
  await writeFile(
    join(process.cwd(), 'seed2-updated2.json'),
    JSON.stringify(updatedData, null, 2),
  );

  console.log('All profile images processed and data updated successfully!');
}

// Run the script
processAndUpdateSeedData().catch(console.error);
