import React from 'react';
import PageCenterMessage from '@/components/PageCenterMessage';
import { genPageMetadata } from '@/app/seo';

export const metadata = genPageMetadata({
  title: '500',
  description:
    "Une erreur interne du serveur s'est produite. Veuillez réessayer ultérieurement ou contacter notre équipe de support.",
});

const ErrorServerPage = () => {
  const errorMessage =
    "Une erreur interne du serveur s'est produite. Veuillez réessayer ultérieurement ou contacter notre équipe de support.";

  return <PageCenterMessage text={errorMessage} />;
};

export default ErrorServerPage;
