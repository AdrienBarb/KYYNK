import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import imgixLoader from '@/lib/imgix/loader';
import { getNudeById } from '@/services/nudes/getNudesById';

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata | undefined> {
  const nude = await getNudeById({ nudeId: id });

  if (!nude) {
    return undefined;
  }

  const imageUrl = imgixLoader({
    src: nude.media?.thumbnailId || '',
    width: 400,
    quality: 80,
    transformations: nude.fiatPrice > 0 ? { blur: 500 } : {},
  });

  return genPageMetadata({
    title: `Nudes - ${nude.user.pseudo}`,
    description: nude.description ?? '',
    image: imageUrl,
    url: `/nudes/${nude.id}`,
  });
}

const NudePage = async ({ params: { id } }: { params: { id: string } }) => {
  const nude = await getNudeById({ nudeId: id });

  if (!nude) {
    redirect('/404');
  }

  if (nude.isArchived) {
    redirect(`/${nude.user.slug}`);
  }

  redirect(`/${nude.user.slug}?view=feed&n=${nude.id}`);
};

export default NudePage;
