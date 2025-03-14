import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import ErrorMessage from '@/components/ErrorMessage';
import { getTranslations } from 'next-intl/server';
import UserProfileTopButtons from '@/components/UserProfileTopButtons';
import { auth } from '@/auth';
import UserUncompletedProfileBanner from '@/components/profile/UserUncompletedProfileBanner';
import UserProfileHeader from '@/components/UserProfileHeader';
import PageContainer from '@/components/PageContainer';
import { getUserBySlug } from '@/services/users/getUserBySlug';
import { getUserNudesById } from '@/services/nudes/getUserNudesById';
import UserNudes from '@/components/nudes/UserNudes';
import { formatNudeWithPermissions } from '@/utils/nudes/formatNudeWithPermissions';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { NudeFromPrisma, NudeWithPermissions } from '@/types/nudes';
import { FetchedUserType } from '@/types/users';
import imgixLoader from '@/lib/imgix/loader';

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const user = await getUserBySlug({ slug });

  const imageUrl = imgixLoader({
    src: user?.profileImageId ?? '',
    width: 1200,
    quality: 80,
  });

  return genPageMetadata({
    title: user?.pseudo ?? '',
    description: user?.description ?? '',
    image: imageUrl ?? '',
    url: `/${user?.slug}`,
  });
}

const UserPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const t = await getTranslations();
  const session = await auth();

  const user = (await getUserBySlug({ slug })) as FetchedUserType;

  if (!user) {
    redirect('/404');
  }

  if (user.isArchived) {
    return <ErrorMessage message={t('error.userArchived')} />;
  }

  const nudes = (await getUserNudesById({
    userId: user.id,
  })) as NudeFromPrisma[];
  const nudesWithPermissions = nudes.map((currentNude) =>
    formatNudeWithPermissions(currentNude, session?.user.id),
  ) as NudeWithPermissions[];

  return (
    <PageContainer className="max-w-screen-lg mx-auto">
      <PaddingContainer>
        <UserUncompletedProfileBanner />
        <UserProfileTopButtons />
        <UserProfileHeader initialUserDatas={user} />
        <UserNudes initialNudes={nudesWithPermissions} user={user} />
      </PaddingContainer>
    </PageContainer>
  );
};

export default UserPage;
