import NudesFeed from '@/components/NudesFeed';
import nudeService from '@/features/nude/nudeService';
import { redirect } from '@/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import styles from '@/styles/FeedPage.module.scss';

const FeedPage = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  const initialNudesDatas = await nudeService.getAllNudes({});

  return (
    <div className={styles.feedContainer}>
      <NudesFeed initialNudesDatas={initialNudesDatas} />
    </div>
  );
};

export default FeedPage;
