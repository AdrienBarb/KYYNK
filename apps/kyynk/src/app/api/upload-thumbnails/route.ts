import { uploadToS3 } from '@/utils/s3Uploader';
import seedData from '../../../../seed2.json';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

async function fetchAndUploadThumbnail(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get the content type from the response
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Upload to S3
    const s3Key = await uploadToS3({
      file: buffer,
      folder: 'thumbnails',
      fileType: contentType,
    });

    return s3Key;
  } catch (error) {
    console.error(`Error processing thumbnail: ${url}`, error);
    throw error;
  }
}

export async function GET() {
  try {
    const updatedData = await Promise.all(
      seedData.map(async (user) => {
        const updatedNudes = await Promise.all(
          user.nudes.map(async (nude) => {
            const newThumbnailKey = await fetchAndUploadThumbnail(
              nude.thumbnail,
            );
            return {
              ...nude,
              thumbnail: newThumbnailKey,
            };
          }),
        );

        return {
          ...user,
          nudes: updatedNudes,
        };
      }),
    );

    // Write the updated data back to a new JSON file
    await fs.writeFile(
      path.join(process.cwd(), 'seed2-updated.json'),
      JSON.stringify(updatedData, null, 2),
    );

    return NextResponse.json({
      message: 'All thumbnails processed and data updated successfully!',
      data: updatedData,
    });
  } catch (error) {
    console.error('Error processing thumbnails:', error);
    return NextResponse.json(
      { error: 'Failed to process thumbnails' },
      { status: 500 },
    );
  }
}
