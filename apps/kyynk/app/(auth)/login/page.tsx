import React from 'react';
import PageContainer from '@/components/PageContainer';
import styles from '@/styles/AuthPage.module.scss';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import UserSignInForm from '@/components/auth/UserSignInForm';

const LoginPage = () => {
  const t = useTranslations();

  return (
    <PageContainer>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h2 data-id="sign-in-title">{t('common.signIn')}</h2>
        </div>
        <UserSignInForm />
        <div className={styles.buttonsWrapper}>
          <Button asChild variant="secondary">
            <Link href="/register">{t('common.signUp')}</Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="text-sm text-primary font-light"
          >
            <Link href="/login/forgot-password">
              {t('common.forgotPassword')}
            </Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default LoginPage;
