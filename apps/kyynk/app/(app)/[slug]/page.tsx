import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { getUserBySlug } from '@/lib/api/users/getUserBySlug';
import { redirect } from 'next/navigation';
import ErrorMessage from '@/components/ErrorMessage';
import { getTranslations } from 'next-intl/server';
import BackButton from '@/components/Common/BackButton';
import UserProfileTopButtons from '@/components/UserProfileTopButtons';
import { auth } from '@/auth';
import UserUncompletedProfileBand from '@/components/UserUncompletedProfileBand';
import UserProfileHeader from '@/components/UserProfileHeader';
import PageContainer from '@/components/PageContainer';

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

  const user = await getUserBySlug({ slug });

  if (!user) {
    redirect('/404');
  }

  if (user.isArchived) {
    return <ErrorMessage message={t('error.userArchived')} />;
  }

  return (
    <PageContainer>
      <BackButton isVisible={!!session} prevPath="/dashboard/community">
        <UserProfileTopButtons />
      </BackButton>

      <UserUncompletedProfileBand />
      <UserProfileHeader initialUserDatas={user} />
      {/* {(initialUserDatas?.isAccountVerified || session?.user?.id === userId) &&
        initialUserDatas?.userType === 'creator' && (
          <div className={styles.contentContainer}>{children}</div>
        )} */}
    </PageContainer>
  );
};

export default UserPage;
