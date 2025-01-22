import React from 'react';
import PageContainer from '@/components/PageContainer';
import UserSignUpForm from '@/components/UserSignUpForm';
import styles from '@/styles/AuthPage.module.scss';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const SignUpPage = () => {
  const t = useTranslations();

  return (
    <PageContainer>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h2>{t('common.signUp')}</h2>
        </div>
        <UserSignUpForm />
        <div className={styles.buttonsWrapper}>
          <Button asChild variant="secondary">
            <Link href="/login">{t('common.signIn')}</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default SignUpPage;
