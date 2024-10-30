import { prisma } from '@/lib/db/client';
import slugify from 'slugify';

export async function checkOrCreateSlug(pseudo: string) {
  const slug = slugify(pseudo, { lower: true, strict: true });

  let uniqueSlug = slug;
  let counter = 1;

  while (await prisma.user.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}
