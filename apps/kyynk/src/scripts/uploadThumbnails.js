import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFile, writeFile, readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-west-3',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadToS3Direct(buffer, contentType) {
  const bucketName = process.env.S3_BUCKET;
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

async function processProfileImage(imagePath) {
  try {
    const buffer = await readFile(imagePath);
    const contentType = 'image/jpeg'; // You might want to detect this dynamically

    // Upload to S3
    const s3Key = await uploadToS3Direct(buffer, contentType);
    return s3Key;
  } catch (error) {
    console.error(`Error processing profile image: ${imagePath}`, error);
    throw error;
  }
}

async function generateCreatorsSeedData() {
  const fakeFolderPath = join(__dirname, 'fake');

  try {
    const creators = await readdir(fakeFolderPath);

    const creatorsData = await Promise.all(
      creators.map(async (creatorFolder) => {
        const profileImagePath = join(
          fakeFolderPath,
          creatorFolder,
          'profile_image',
          'profile.jpg',
        );

        try {
          const profileImageUrl = await processProfileImage(profileImagePath);

          return {
            pseudo: creatorFolder,
            profileImageUrl: profileImageUrl,
            description: '',
            nudes: [
              {
                description: '',
                thumbnail: '',
                videoKey: '',
              },
            ],
          };
        } catch (error) {
          console.error(`Error processing creator ${creatorFolder}:`, error);
          return null;
        }
      }),
    );

    console.log('🚀 ~ generateCreatorsSeedData ~ creatorsData:', creatorsData);

    // Write the data to a JSON file
    await writeFile(
      join(process.cwd(), 'creators-seed.json'),
      JSON.stringify(creatorsData, null, 2),
    );

    console.log('Creators seed data generated successfully!');
  } catch (error) {
    console.error('Error generating creators seed data:', error);
    throw error;
  }
}

// Run the script
generateCreatorsSeedData().catch(console.error);
