import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import ErrorMessage from '@/components/ErrorMessage';
import { getTranslations } from 'next-intl/server';
import UserProfileTopButtons from '@/components/UserProfileTopButtons';
import { auth } from '@/auth';
import UserUncompletedProfileBand from '@/components/UserUncompletedProfileBand';
import UserProfileHeader from '@/components/UserProfileHeader';
import PageContainer from '@/components/PageContainer';
import { getUserBySlug } from '@/services/users/getUserBySlug';
import { getUserNudesById } from '@/services/nudes/getUserNudesById';
import UserNudes from '@/components/nudes/UserNudes';
import { addPermissionsToNudes } from '@/utils/nudes/addPermissionsToNudes';
import { User } from '@prisma/client';
import { NudeType } from '@/types/nudes';

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const user = await getUserBySlug({ slug });

  return genPageMetadata({
    title: user?.pseudo ?? '',
    description: user?.description ?? '',
    image: user?.profileImageId ?? '',
  });
}

const UserPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const t = await getTranslations();
  const session = await auth();

  const user = (await getUserBySlug({ slug })) as User;

  if (!user) {
    redirect('/404');
  }

  if (user.isArchived) {
    return <ErrorMessage message={t('error.userArchived')} />;
  }

  const nudes = (await getUserNudesById({ userId: user.id })) as NudeType[];
  const nudesWithPermissions = addPermissionsToNudes(nudes, session?.user.id);

  return (
    <PageContainer>
      <UserProfileTopButtons />

      <UserUncompletedProfileBand />

      <UserProfileHeader initialUserDatas={user} />

      <UserNudes initialNudes={nudesWithPermissions} />
    </PageContainer>
  );
};

export default UserPage;
