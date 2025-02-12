import apiVideoClient from '@/lib/api-video/client';
import { createCanvas } from 'canvas';
import path from 'path';
import fs from 'fs/promises';
import { createReadStream } from 'fs';
import { prisma } from '@/lib/db/client';

export const createWatermark = async ({
  userId,
  slug,
}: {
  userId: string;
  slug: string;
}) => {
  try {
    const watermarkPath = await generateWatermark(slug);

    const watermark = await apiVideoClient.watermarks.upload(
      createReadStream(watermarkPath),
    );

    await prisma.user.update({
      where: { id: userId },
      data: { watermarkId: watermark.watermarkId! },
    });

    console.log('Watermark uploaded:', watermark);
    return watermark;
  } catch (error) {
    console.error('Error uploading watermark:', error);
    throw error;
  }
};

export const generateWatermark = async (slug: string): Promise<string> => {
  const width = 975;
  const height = 150;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background color (fully transparent)
  ctx.clearRect(0, 0, width, height);

  // Add text with bold style
  ctx.font = 'bold 65px Arial';
  ctx.fillStyle = 'white'; // Text color
  ctx.textAlign = 'right';
  ctx.fillText(`kyynk.com/${slug}`, width, height / 2 + 60); // Move text down by 20 pixels

  // Save the image
  const watermarkPath = path.join('/tmp', `watermark-${slug}.png`);
  const buffer = canvas.toBuffer('image/png');

  await fs.writeFile(watermarkPath, buffer);
  return watermarkPath;
};
